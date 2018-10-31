import { observable, set as mobXSet } from 'mobx';
import {
  isFunction,
  setNestedObjectValues,
  setIn,
  yupToFormErrors,
  validateYupSchema,
  getIn
} from './utils';
import { set } from 'lodash';

export default interface FormViewModel {
  /**
   * This method runs on every form update.
   * If this returns an object that has values, the form will be in an invalid state.
   */
  validate?: ((values) => any);
  /**
   * This method runs on every form update as well.
   * The difference here is that this is a validationSchema that is provided by yup.
   * It can be either a function or not.
   */
  validationSchema: any | (() => any);
  /**
   * When the user presses the cancel button, currently it will do nothing.
   */
  onCancel?: (() => any);
};

export default class FormViewModel {
  /**
   * This is the initial state of the form. This gets copied over to `values` in constructor runtime. On reset, this is used to reset the values to an initial state.
   */
  initialValues: any = {};
  /**
   * These are the values of the form - the current state. Note that unlike formik, the values change automatically instead of waiting on the next render cycle - so there's a huge difference there.
   */
  @observable values: any = { ...this.initialValues };
  /**
   * This is used when any of the fields mentioned are touched; meaning interacted with. By default, `<Field />` uses onBlur for this event.
   */
  @observable touched: any = {};
  /**
   * This is an object that consists of all the errors.
   */
  @observable errors: any = {};
  /**
   * This is true when the form is currently submitting, false otherwise.
   */
  @observable isSubmitting = false;
  /**
   * This is to keep track of how many times the user clicked on the submit.
   */
  @observable submitCount = 0;
  /**
   * If provided, after all validations are run for the parent, it will run validation for all children.
   * Note: This only can handle children at the root level. If desired to handle children at a level other
   * than root, please do so at the FormViewModel.
   */
  @observable childFormModels: {[key: string]: FormViewModel} = {};
  /**
   * If provided, when setting the field as touched, it will inform the parent about the field being touched.
   * Note: This only can handle children at the root level. If desired to handle children at a level other
   * than root, please do so at the FormViewModel.
   */
  @observable childProp;
  parentViewModel;

  constructor(values?) {
    this.onReset = this.onReset.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.setFieldError = this.setFieldError.bind(this);
    this.setFieldTouched = this.setFieldTouched.bind(this);
    this.setValues = this.setValues.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if (values) {
      this.setInitialValues(values);
      this.setValues(values, false);
    }
  }

  /**
   * When the user has succesfully saved the form
   * @param response
   */
  onSubmitSuccess(response) {
    return response;
  }
  /**
   * When the user has passed validation and is now going to submit.
   */
  onSubmit(values?) {
    return values;
  }

  /**
   * Determines if the form is valid.
   */
  get isValid() {
    return Object.keys(this.errors).length === 0;
  }

  /**
   * This is a generic method to get the value from inputEvent.
   * The code tries to pass in e.target into target, but if target doesn't exist, target is the event
   * property.
   *
   * Now if neither doesn't work, use other to figure out what should be returned as a value to the model.
   *
   * @param target
   * @param other
   */
  getValueFromInputEvent(target, ...other) {
    const { type, value, checked } = target;
    const isNumericalValue = /number|range/.test(type);
    const isCheckbox = /checkbox/.test(type);

    if (isNumericalValue) {
      let parsed = parseFloat(value);
      return isNaN(parsed) ? '' : parsed;
    }

    if (isCheckbox) {
      return checked;
    }

    return value;
  }

  /**
   * This gets the name to be applied to the values property.
   * By default, it will assume name as the property, but if id is present it will use that too.
   * @param target
   * @param other
   */
  getNameFromInputEvent(target, ...other) {
    const { name, id } = target;
    return name || id;
  }

  /**
   * This method is the default handler for handling change events.
   */
  handleChange(e, ...other) {
    const target = e.target || e;
    const fieldName = this.getNameFromInputEvent(target, ...other);
    const fieldValue = this.getValueFromInputEvent(target, ...other);
    if (e.persist) {
      e.persist();
    }
    this.setFieldValue(fieldName, fieldValue);
  }

  /**
   * This method is the default handler for handling blur events.
   */
  handleBlur(e, ...other) {
    const target = e.target || e;
    const fieldName = this.getNameFromInputEvent(target, ...other);
    this.setFieldTouched(fieldName, true);
  }

  /**
   * This method sets a field value explicitly.
   * The added benefit is that validations will be run after setFieldValue is called.
   * Note that setFieldValue will automatically do the change immediately; there is no need to wait for another cycle.
   */
  setFieldValue(name, value) {
    this.setInMobx('values', name, value);
    this.runValidations();
  }

  setInitialValues(values) {
    // we make a copy so that if we need it, we can refer to it
    this.initialValues = {...values};
  }

  /**
   * This method sets all field values explicitly.
   * Note that this will cause every form value to re-render, because the entire values object has changed.
   * The added benefit is that validations will be run after setValues is called.
   * Note that setValues will automatically do the change immediately; there is no need to wait for another cycle.
   */
  setValues(values, validate=true) {
    this.values = values;
    validate && this.runValidations();
  }

  /**
   * This method sets a single field touched value explicitly.
   * The added benefit is that validations will be run after setFieldTouched is called.
   * Note that setFieldTouched will automatically do the change immediately; there is no need to wait for another cycle.
   */
  setFieldTouched(name, value) {
    this.setInMobx('touched', name, value);

    if (this.parentViewModel) {
      this.parentViewModel.setFieldTouched(`${this.childProp}.${name}`, value);
    }

    this.runValidations();
  }

  /**
   * This method sets a single field error value explicitly.
   * Note that setFieldError will automatically do the change immediately; there is no need to wait for another cycle.
   */
  setFieldError(name, value) {
    this.setInMobx('errors', name, value);
  }

  /**
   * This method changes all the errors explicilty.
   * Note that setErrors will automatically do all the changes immediately, no need to wait for another cycle.
   */
  setErrors(errors) {
    this.errors = errors;
  }

  /**
   * Sets the form as currently being submitted or not.
   * @param value
   */
  setSubmitting(value) {
    this.isSubmitting = value;
  }

  addChildFormModel(fm: FormViewModel, key) {
    fm.childProp = key;
    fm.parentViewModel = this;
    mobXSet(this.childFormModels, {[key]: fm});
  }

  /**
   * This method is the core method for all the validations to run.
   * It returns a boolean: if its true then the form is valid, false otherwise.
   * @param values
   */
  async runValidations(values = this.values): Promise<boolean> {
    let schemaErrors;
    let validateFnErrors;

    if (this.validationSchema) {
      schemaErrors = await this.runValidationSchema(values);
    }

    if (this.validate) {
      validateFnErrors = await this.validate(this.values);
    }

    this.errors = { ...schemaErrors, ...validateFnErrors };

    if (this.childFormModels) {
      for (const name in this.childFormModels) {
        if (!this.childFormModels.hasOwnProperty(name)) {
          continue;
        }

        const formViewModel = this.childFormModels[name];

        const isValid = await formViewModel.runValidations();
        if (isValid) {
          continue;
        }

        this.errors = {...this.errors, ...{[formViewModel.childProp]: {...formViewModel.errors}} };
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  /**
   * By default, this resets the form to a pristine state. If this method is overridden, please call `super.onReset()` to get to an initial state.
   */
  onReset() {
    this.setValues(this.initialValues, false);
    this.touched = {};
    this.errors = {};
    this.isSubmitting = false;
    this.submitCount = 0;
  }

  /**
   * This method handles the submit event.
   * @param e
   */
  handleSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return this.submitForm();
  }

  /**
   * This method handles the reset event.
   */
  handleReset() {
    if (this.onReset) {
      this.onReset();
    }
  }

  /**
   * This method handles the cancel event.
   */
  handleCancel() {
    if (this.onCancel) {
      this.onCancel();
    }
  }

  /**
   * This method is the main submitForm handler when the submit event is invoked.
   * 1. We set all form values as touched
   * 2. We set isSubmitting = true then set it to false afterward.
   */
  async submitForm() {
    try {
      this.touched = setNestedObjectValues(this.values, true);
      this.isSubmitting = true;
      this.submitCount = this.submitCount + 1;

      const isValid = await this.runValidations();

      if (!isValid) {
        throw this.errors;
      }

      const response = await this.onSubmit(this.values);
      if (this.onSubmitSuccess) {
        await this.onSubmitSuccess(response);
      }
      this.isSubmitting = false;
    } catch (e) {
      this.isSubmitting = false;
      return this.onSubmitError(e);
    }
  }

  /**
   * When the user submits but an error occurs, by default it will just throw a console.error.
   * @param e
   */
  onSubmitError(e) {
    console.error('Error when submitting form', e);
  }

  /**
   * This runs the validation schema and translates it to a more readable form that mobx-form-model can present.
   * @param values
   */
  async runValidationSchema(values) {
    const schema = isFunction(this.validationSchema)
      ? this.validationSchema()
      : this.validationSchema;
    try {
      await validateYupSchema(values, schema);
      return {};
    } catch (err) {
      const errors = yupToFormErrors(err);
      return errors;
    }
  }

  /**
   * This method sets a value in any object here w/ mobx. It uses set if the value is defined, it overwrites the entire thing
   * otherwise.
   * @param prop
   * @param name
   * @param value
   */
  private setInMobx(prop, name, value) {
    const lastValue = getIn(this[prop], name);

    if (lastValue === undefined) {
      this[prop] = setIn(this[prop], name, value);
      return;
    }

    return set(this[prop], name, value);
  }
}
