import Field from '@hrgui/mobx-form-model/src/Field';
import React from 'react';
import ModelForm from '@hrgui/mobx-form-model/src/ModelForm';
import { observer } from 'mobx-react';
import { storiesOf } from '@storybook/react/dist/client/preview';
import MockFetch from '../components/MockFetch';

const PersonForm = observer(function({data}) {
  return (
    <ModelForm
      initialValues={data}
      onSubmit={async () => {
        const res = await fetch("/api/person", {method: "POST"});
        return res.json();
      }}
      onSubmitSuccess={(res) => {
        alert(JSON.stringify(res));
      }}>
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
          <pre>values: {JSON.stringify(person.values, null, 2)}</pre>
          <pre>touched: {JSON.stringify(person.touched, null, 2)}</pre>
          <pre>errors: {JSON.stringify(person.errors, null, 2)}</pre>
          <div style={{position: "fixed", "bottom": 0, "padding": "20px"}}>
            <button onClick={person.handleSubmit}>Save</button>
          </div>
        </React.Fragment>)}
    </ModelForm>
  );
})


const stories = storiesOf("Basic Form", module);
stories.add("Without any model", () => <MockFetch onMockSetup={(fetchMock) => {
  fetchMock.post('/api/person', {
    status: 200,
    body: {
      'hello': 'world'
    }
  });
}}>
  <PersonForm data={{
      firstName: "Mickey",
      lastName: "Mouse",
      preference1: "T1",
      nestedModel: {
        a: '3',
        b: '2'
      }
    }} />
</MockFetch>);

// ReactDOM.render(<PersonForm />, document.querySelector("#root"));