import { observable } from 'mobx';
import { isFunction, setNestedObjectValues, setIn, yupToFormErrors, validateYupSchema, getIn } from './utils';
import {set} from 'lodash';

export default class FormViewModel {
  validate?;
  validationSchema?;
  initialValues = {};
  @observable values = { ...this.initialValues };
  @observable touched = {};
  @observable errors = {};
  @observable isSubmitting = false;
  @observable submitCount = 0;

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

  getNameFromInputEvent(target, ...other) {
    const { name, id } = target;
    return name || id; 
  }

  handleChange = (e, ...other) => {
    const target = e.target || e;
    const fieldName = this.getNameFromInputEvent(target, ...other);
    const fieldValue = this.getValueFromInputEvent(target, ...other);
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

  protected handleSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return this.submitForm();
  }

  protected handleReset() {
    if (this.onReset) {
      this.onReset();
    }
  }

  protected async submitForm() {
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
  }

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

  private setInMobx(prop, name, value) {
    const lastValue = getIn(this[prop], name);

    if (lastValue === undefined) {
      this[prop] = setIn(this[prop], name, value);
    } else {
      set(this[prop], name, value);
    }
  }
}
