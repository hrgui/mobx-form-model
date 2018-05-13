import {observable} from 'mobx';
import {isFunction, setNestedObjectValues, setIn, yupToFormErrors, validateYupSchema, getIn} from './utils';
import set from 'lodash.set';

export default class FormViewModel {
  validate;
  validationSchema;
  initialValues = {};
  @observable values = {...this.initialValues};
  @observable touched = {};
  @observable errors = {};
  @observable isSubmitting = false;
  @observable submitCount = 0;

  getValueFromEvent(e) {
    const {type, value, checked} = e.target;
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
    const {name, id} = target;
    const fieldName = name || id;
    const fieldValue = this.getValueFromEvent(e);
    if (e.persist) {
      e.persist();
    }
    this.setFieldValue(fieldName, fieldValue);
  }

  handleBlur = (e) => {
    const target = e.target || e;
    const {name, id} = target;
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

  setInMobx(prop, name, value) {
    const lastValue = getIn(this[prop], name);

    if (lastValue === undefined) {
      this[prop] = setIn(this[prop], name, value);
    } else {
      set(this[prop], name, value);
    }
  }

  setFieldTouched = (name, value) => {
    // if (typeof this.touched[name] === "undefined") {
    //   this.touched = setIn(this.touched, name, value);
    // } else {
    //   this.touched[name] = value;
    // }

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
    this.values = {...this.initialValues};
    this.touched = {};
    this.errors = {};
    this.isSubmitting = false;
  };

  async runValidationSchema(values) {
    const schema = isFunction(this.validationSchema) ? this.validationSchema() : this.validationSchema;
    try {
      const results = await validateYupSchema(values, schema);
      return {};
    } catch(err) {
      const errors = yupToFormErrors(err);
      console.log(errors);
      this.isSubmitting = false;
      return errors;
    }
  }

  async runValidations(values = this.values) {
    let schemaErrors;
    let validateFnErrors;

    if (this.validationSchema) {
      schemaErrors = await this.runValidationSchema(values);
    }

    if (this.validate) {
      validateFnErrors = await this.validate(this.values);
    }

    this.errors = {...schemaErrors, ...validateFnErrors};
  }

  submitForm = async () => {
    this.touched = setNestedObjectValues(this.values, true);
    this.isSubmitting = true;
    this.submitCount = this.submitCount + 1;

    if (this.validate) {
      this.errors = await this.validate(this.values);
      const isValid = Object.keys(this.errors).length === 0;

      if (!isValid) {
        return;
      }
    }

    if (this.validationSchema) {
      this.errors = await this.runValidationSchema(this.values);
    }

    return this.executeSubmit();
  }

  executeSubmit() {

  }

  onReset(values?) {

  }

  handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return this.submitForm();
  }

  private handleReset = () => {
    if (this.onReset) {
      this.onReset(this.values);
    }
  };
}
