# @hrgui/mobx-form-model

**API is still unstable, and it may change wildly!**

Yes, another attempt to bind mobx and forms, again. 

I really like the API from [formik](https://github.com/jaredpalmer/formik) but I also do like [mobx](https://github.com/mobxjs/mobx). However, with formik, a lot of the logic ends up baked into the component, which makes it tied to React.

This is an attempt to move the logic and put it elsewhere, into MobX. 

<!-- TOC -->

- [@hrgui/mobx-form-model](#hrguimobx-form-model)
- [Who is this library for?](#who-is-this-library-for)
- [Who is this library not for?](#who-is-this-library-not-for)
- [Example](#example)
- [How it works](#how-it-works)
- [API](#api)
- [FAQ](#faq)
  - [Why not just use formik, and sync it to MobX?](#why-not-just-use-formik-and-sync-it-to-mobx)

<!-- /TOC -->

# Who is this library for?
- For those who don't want to mix React and busineess logic together. 

# Who is this library not for?
- Those who don't use MobX and prefer plain-jane React. If that is the case, use [formik](https://github.com/jaredpalmer/formik)

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
1. A `<ModelForm />` is really just a `mobx-react` `<Provider />` that either provides a MobX form model or creates one.
2. A `<Field />` is an observer than injects the value provided by `<Provider />` and supplies it the rendered component.
3. When the `<Field />` updates by user interaction, it calls the Model's `handleChange` method, which changes the Model's `values` observable.
4. When the observable `values` changes, then it updates React accordingly.


# API
See [docs](docs/README.md)

# FAQ

## Why not just use formik, and sync it to MobX? 
Synchronization of state between Formik and MobX is taboo, unless if you are a jedi. Doing so will have you ponder about the React lifecycle, or have very bad performance issues on forms.