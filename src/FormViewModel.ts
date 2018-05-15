import { observable } from 'mobx';
import { isFunction, setNestedObjectValues, setIn, yupToFormErrors, validateYupSchema, getIn } from './utils';
import set from 'lodash.set';

export default class FormViewModel {
  validate?;
  validationSchema?;
  initialValues = {};
  @observable values = { ...this.initialValues };
  @observable touched = {};
  @observable errors = {};
  @observable isSubmitting = false;
  @observable submitCount = 0;

  getValueFromInputEvent(e) {
    const { type, value, checked } = e.target;
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

  handleChange = (e) => {
    const target = e.target || e;
    const { name, id } = target;
    const fieldName = name || id;
    const fieldValue = this.getValueFromInputEvent(e);
    if (e.persist) {
      e.persist();
    }
    this.setFieldValue(fieldName, fieldValue);
  }

  handleBlur = (e) => {
    const target = e.target || e;
    const { name, id } = target;
    const fieldName = name || id;
    this.setFieldTouched(fieldName, true);
  }

  setFieldValue = (name, value) => {
    this.setInMobx('values', name, value);
    this.runValidations();
  };

  setValues = (values) => {
    this.values = values;
    this.runValidations();
  };

  setFieldTouched = (name, value) => {
    this.setInMobx('touched', name, value);
    this.runValidations();
  };

  setFieldError = (name, value) => {
    this.errors[name] = value;
  };

  setErrors = (errors) => {
    this.errors = errors;
  };

  resetForm = () => {
    this.values = { ...this.initialValues };
    this.touched = {};
    this.errors = {};
    this.isSubmitting = false;
  };


  async runValidations(values = this.values) {
    let schemaErrors;
    let validateFnErrors;

    if (this.validationSchema) {
      schemaErrors = await this.runValidationSchema(values);
    }

    if (this.validate) {
      validateFnErrors = await this.validate(this.values);
    }

    this.errors = { ...schemaErrors, ...validateFnErrors };

    return Object.keys(this.errors).length === 0;
  }

  onReset = () => {
    this.values = { ...this.initialValues };
    this.touched = {};
    this.errors = {};
    this.isSubmitting = false;
    this.submitCount = 0;
  };

  onSubmitSuccess(response) {}
  onSubmitError(e) {}
  onSubmit() {}

  private handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return this.submitForm();
  };

  private submitForm = async () => {
    try {
      this.touched = setNestedObjectValues(this.values, true);
      this.isSubmitting = true;
      this.submitCount = this.submitCount + 1;

      const isValid = await this.runValidations();

      if (!isValid) {
        throw this.errors;
      }
      
      const response = await this.onSubmit();
      await this.onSubmitSuccess(response);
    } catch(e) {
      console.error('Error when submitting form', e);
      return this.onSubmitError(e);
    }
  };

  private async runValidationSchema(values) {
    const schema = isFunction(this.validationSchema) ? this.validationSchema() : this.validationSchema;
    try {
      const results = await validateYupSchema(values, schema);
      return {};
    } catch (err) {
      const errors = yupToFormErrors(err);
      this.isSubmitting = false;
      return errors;
    }
  };

  private handleReset = () => {
    if (this.onReset) {
      this.onReset();
    }
  };

  private setInMobx(prop, name, value) {
    const lastValue = getIn(this[prop], name);

    if (lastValue === undefined) {
      this[prop] = setIn(this[prop], name, value);
    } else {
      set(this[prop], name, value);
    }
  }
}
