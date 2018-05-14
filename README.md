# @hrgui/mobx-form-model

Yes, another attempt to bind mobx and forms, again. 

I really like the API from [formik](https://github.com/jaredpalmer/formik) but I also do like [mobx](https://github.com/mobxjs/mobx). This library takes the best parts of formik and creates it into a MobX observable that is passed down through context.

<!-- TOC -->

- [@hrgui/mobx-form-model](#hrguimobx-form-model)
- [Who is this library for?](#who-is-this-library-for)
- [Who is this library not for?](#who-is-this-library-not-for)
- [Example](#example)
- [How it works](#how-it-works)
- [API](#api)
  - [Properties](#properties)
    - [initialValues](#initialvalues)
    - [values](#values)
    - [touched](#touched)
    - [errors](#errors)
    - [validate](#validate)
    - [validationSchema](#validationschema)
    - [isSubmitting](#issubmitting)
    - [submitCount](#submitcount)
  - [Methods](#methods)
    - [onReset](#onreset)
    - [onSubmit](#onsubmit)
    - [getValueFromInputEvent](#getvaluefrominputevent)
    - [handleChange](#handlechange)
    - [handleBlur](#handleblur)
    - [handleSubmit](#handlesubmit)
    - [setFieldValue](#setfieldvalue)
    - [setValues](#setvalues)
    - [setFieldTouched](#setfieldtouched)
    - [setFieldError](#setfielderror)
    - [setErrors](#seterrors)
    - [resetForm](#resetform)
    - [runValidations](#runvalidations)
    - [onSubmitSuccess](#onsubmitsuccess)
    - [onSubmitError](#onsubmiterror)
- [FAQ](#faq)
  - [Why not just use formik, and sync it to MobX?](#why-not-just-use-formik-and-sync-it-to-mobx)

<!-- /TOC -->

# Who is this library for?
- For those who don't want to mix React and busineess logic together. 
- For those that don't want to rely on render props to do everything and prefer mobx observables.

# Who is this library not for?
- Those who don't use mobx.

# Example

https://codesandbox.io/s/2vonkqjjxp

```jsx
import { observer } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import {render} from 'react-dom';
import { Field, FormViewModel, ModelForm } from "@hrgui/mobx-form-model";
import yup from "yup";

class Person extends FormViewModel {
  validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required()
  });

  validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "You will need a firstname, buddy.";
    }

    return errors;
  };

  constructor() {
    super();

    this.initialValues = {
      firstName: "Mickey",
      lastName: "Mouse"
    };
  }

  onSubmit() {
    alert(this.values);
  }
}

const person = new Person();

@observer
export class PersonForm extends React.Component {
  @observable person = new Person();

  render() {
    return (
      <ModelForm model={this.person}>
        <Field name="firstName" />
        <Field name="lastName" />
        <Field name="address.city" />
        <input
          type="text"
          value={this.person.values.firstName}
          onChange={e => (this.person.values.firstName = e.target.value)}
        />
        <pre>values: {JSON.stringify(this.person.values, null, 2)}</pre>
        <pre>touched: {JSON.stringify(this.person.touched, null, 2)}</pre>
        <pre>errors: {JSON.stringify(this.person.errors, null, 2)}</pre>
        <button onClick={this.person.handleSubmit}>Save</button>
      </ModelForm>
    );
  }
}

render(<PersonForm />, document.getElementById("root"));

```

# How it works
`<ModelForm />` and `<Field />` uses React.Context for both the `FormViewModel` and the View elements to contact to each other.


# API 

## Properties
### initialValues

This is the initial state of the form. This gets copied over to `values` in constructor runtime. On reset, this is used to reset the values to an initial state.

### values

These are the values of the form - the current state. Note that unlike formik, the values change automatically instead of waiting on the next render cycle - so there's a huge difference there. 

### touched

This is used when any of the fields mentioned are touched; meaning interacted with. By default, `<Field />` uses onBlur for this event.

### errors

This is an object that consists of all the errors.

### validate

If this is a function, mobx-form-model will call this method. It expects an object to returned that consists of all the errors.

### validationSchema

This is a `yup` schema method - which is an awesome part of Formik. It can be either a Yup Schema or a function that returns a Yup schema.

Note that unlike Formik, validate and validationSchema can be used simultaneously - both will end up being concatenated with validate being the override of validationSchema.

### isSubmitting

If true, the form is currently being submitted.

### submitCount

The number of times the form was being submitted.

## Methods

### onReset
By default, this resets the form to a pristine state. If this method is overridden, please call `super.onReset()` to get to an initial state.

### onSubmit

By default, this function does nothing.

### getValueFromInputEvent

React unfortunately doesn't have a great way to have a consistent API between custom components and native components. Override this method if you have custom components that need their own special thing - all it's asking for is; given this input.... how do I get its value? 


### handleChange

The default function to handle a change event from an input. By default, it just sets the field value to the `values` property.


### handleBlur

The default function to handle a blur event from an input. By default, it just sets the field value to the `touched` property.

### handleSubmit

The default function to handle a submit event from an input. By default, it just calls `onSubmit`.

### setFieldValue

Sets a field value through a method. By default, it accepts dot syntax and also will run all the validators.

### setValues

Overrides the entire values object. By default it also runs all the validators. Note, if the entire values object is overwritten, every input will be re-rendered.

### setFieldTouched

Sets a field as touched = true. By default, it accepts dot syntax and also will run all the validators.

### setFieldError

Sets a field error. Note this is the same as saying `this.errors[name] = whatever`

### setErrors

Overrides the entire errors object.

### resetForm

Resets the form; by default it calls `onReset`

### runValidations

This is the method that runs when all validations are being run. It's async method.

### onSubmitSuccess 
This method runs after the onSubmit function finishes and doesn't throw an error.

### onSubmitError
This method runs if onSubmit throws an error.

# FAQ

## Why not just use formik, and sync it to MobX? 
Synchronization of state between Formik and MobX is taboo, unless if you are a jedi. Doing so will have you ponder about the React lifecycle, or have very bad performance issues on forms.