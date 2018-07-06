import FormViewModel from '@hrgui/mobx-form-model/src/FormViewModel';
import Field from '@hrgui/mobx-form-model/src/Field';
import React from 'react';
import ReactDOM from 'react-dom';
import ModelForm from '@hrgui/mobx-form-model/src/ModelForm';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

class Person extends FormViewModel {
  constructor() {
    super({
      firstName: "Mickey",
      lastName: "Mouse",
      preference1: "T1"
    });
  }

  getOtherPrefs(x: any) {
    if (this.values.preference1 === "") {
      return [];
    } 


    return [
      {name: 'N/A', value: ''},
      {name: 'Test 1', value: 'T1'}
    ]
  }
};

class MySelect extends React.Component<any,any> {

  constructor(props) {
    super(props);
    this.state = {
      prefs: props.prefs()
    };
  }


  render() {
    return <select>
        {this.state.prefs.map((x:any) => <option>{x.value}</option>)}
      </select>
  }
}


@observer
export class PersonForm extends React.Component {
  @observable person = new Person();

  render() {
    return (
      <ModelForm model={this.person}>
        <Field name="firstName" />
        <Field name="lastName" />
        {this.person.values.preference === "T2" && <Field name="address.city" />}
        <Field name="preference1" component="select">
          <option value="">N/A</option>
          <option value="T1">Test 1</option>
          <option value="T2">Test 2</option>
        </Field>
        <Field name="preference2" component={MySelect} prefs={(_: any) => this.person.getOtherPrefs(_)} />
        
        <pre>values: {JSON.stringify(this.person.values, null, 2)}</pre>
        <pre>touched: {JSON.stringify(this.person.touched, null, 2)}</pre>
        <pre>errors: {JSON.stringify(this.person.errors, null, 2)}</pre>
        <button onClick={this.person.handleSubmit}>Save</button>
      </ModelForm>
    );
  }
}


ReactDOM.render(<PersonForm />, document.querySelector("#root"));