import FormViewModel from '@hrgui/mobx-form-model/src/FormViewModel';
import Field from '@hrgui/mobx-form-model/src/Field';
import React from 'react';
import ModelForm from '@hrgui/mobx-form-model/src/ModelForm';
import { observable, values } from 'mobx';
import { observer } from 'mobx-react';
import * as yup from 'yup';
import { storiesOf } from '@storybook/react/dist/client/preview';


class NestedModel extends FormViewModel {
  validationSchema = yup.object().shape({
    a: yup.string().required()
  });
}

class Person extends FormViewModel {
  @observable nestedModel;
  validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required()
  });

  //this.nestedModel = new NestedModel(this.values.nestedModel);
  //this.addChildFormModel(this.nestedModel, "nestedModel");

  getOtherPrefs(x: any) {
    if (this.values.preference1 === "") {
      return [];
    }


    return [
      { name: 'N/A', value: '' },
      { name: 'Test 1', value: 'T1' }
    ]
  }
};

class MySelect extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      prefs: props.prefs()
    };
  }


  render() {
    return <select {...this.props}>
      {this.state.prefs.map((x: any) => <option value={x.value}>{x.name}</option>)}
    </select>
  }
}


@observer
export class PersonForm extends React.Component<any, any> {
  static defaultProps = {
    data: {
      firstName: "Mickey",
      lastName: "Mouse",
      preference1: "T1",
      nestedModel: {
        a: '3',
        b: '2'
      }
    }
  };

  onSubmitSuccess() {
    console.log(this);
    alert('done');
  }

  render() {
    return (
      <ModelForm modelConstructor={Person}
        initialValues={this.props.data}
        onSubmitSuccess={this.onSubmitSuccess}>
        {({ model: person }) => (
          <React.Fragment>
            <Field name="firstName" />
            <Field name="lastName" />
            {person.values.preference === "T2" && <Field name="address.city" />}
            <Field name="preference1" component="select">
              <option value="">N/A</option>
              <option value="T1">Test 1</option>
              <option value="T2">Test 2</option>
            </Field>
            <Field name="preference2" component={MySelect} prefs={(_: any) => person.getOtherPrefs(_)} />

            <ModelForm name="nestedModel" initialValues={person.values.nestedModel} modelConstructor={NestedModel}>
              <Field name="a" />
            </ModelForm>

            <pre>values: {JSON.stringify(person.values, null, 2)}</pre>
            <pre>touched: {JSON.stringify(person.touched, null, 2)}</pre>
            <pre>errors: {JSON.stringify(person.errors, null, 2)}</pre>
            <pre>{values(person.childFormModels).length} {person.childFormModels.nestedModel && JSON.stringify(person.childFormModels.nestedModel.errors, null, 2)}</pre>
            <div style={{position: "fixed", "bottom": 0, "padding": "20px"}}>
              <button onClick={person.handleSubmit}>Save</button>
            </div>
          </React.Fragment>)}
      </ModelForm>
    );
  }
}


const stories = storiesOf("Basic Form", module);
stories.add("Basic Form", () => <PersonForm />);

// ReactDOM.render(<PersonForm />, document.querySelector("#root"));