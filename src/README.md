# @hrgui/mobx-form-model

Yes, another attempt to bind mobx and forms, again. 

I really like the API from [formik](https://github.com/jaredpalmer/formik) but I also do like [mobx](https://github.com/mobxjs/mobx). This library takes the best parts of formik and creates it into a MobX observable that is passed down through context.

<!-- TOC -->

- [@hrgui/mobx-form-model](#hrguimobx-form-model)
- [Who is this library for?](#who-is-this-library-for)
- [Who is this library not for?](#who-is-this-library-not-for)
- [Example](#example)
- [API](#api)
- [FAQ](#faq)
  - [Why not just use formik?](#why-not-just-use-formik)

<!-- /TOC -->

# Who is this library for?
- For those who don't want to mix React and busineess logic together. 
- For those that don't want to rely on render props to do everything and prefer mobx observables.

# Who is this library not for?
- Those who don't use mobx.

# Example

```jsx
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import React from 'react';
import {Field, FormViewModel, ModelForm} from '@hrgui/mobx-form-model';

class Person extends FormViewModel {
  constructor() {
    super();

    this.initialValues = {
      firstName: 'Mickey',
      lastName: 'Mouse'
    };
  }
}

const person = new Person();

@observer
export class PersonForm extends React.Component {
  @observable person = new Person();

  render() {
    return <ModelForm model={this.person}>
      <Field name="firstName" />
      <Field name="lastName" />
      <Field name="address.city" />
      <input type="text" value={this.person.firstName} onChange={e => this.person.firstName = e.target.value} />
      <pre>{JSON.stringify(this.person, null, 2)}</pre>
    </ModelForm>
  }
}
```

# API 

Coming Soon, but its very similar to formik.

# FAQ

## Why not just use formik?
Synchronization of state between Formik and MobX is taboo, unless if you are a jedi. Doing so will have you ponder about the React lifecycle, or have very bad performance issues on forms.