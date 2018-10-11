import * as React from 'react';
import { shallow, mount } from 'enzyme';
import {default as InjectedModelForm} from './ModelForm';
import FormViewModel from './FormViewModel';
import {wait} from './testUtils';

//@ts-ignore
const ModelForm: any = InjectedModelForm.wrappedComponent;

describe('ModelForm', () => {

  describe('ModelForm: render props API', () => {
    it('should render default formViewModel w/ nothing provided', () => {
      const wrapper = shallow(
        <ModelForm>
          {({model}) => {
            return <div>Hello World {JSON.stringify(model.values)}</div>
          }}
        </ModelForm>
      );
      expect(wrapper).toBeDefined();
      expect(wrapper.html()).toContain("{}");
    });

    it('should support basic functionality with initial values', async () => {
      const wrapper = shallow(
        <ModelForm initialValues={{name: "Harman"}}>
          {({model}) => {
            return <div>Hello World {JSON.stringify(model.values)}</div>
          }}
        </ModelForm>
      );
      expect(wrapper).toBeDefined();
      expect(wrapper.html()).toContain(`Harman`);
    });

    it('should support basic functionality with initial values', async () => {
      function MyForm({initialValues = {name: "Harman2"}}: {initialValues?}) {
        return (<ModelForm initialValues={initialValues}>
          {({model}) => {
            return <div>Hello World {JSON.stringify(model.values)}</div>
          }}
        </ModelForm>)
      }
      
      const wrapper = mount(<MyForm />);
      wrapper.setProps({initialValues: {name: "Test"}});
      expect(wrapper).toBeDefined();
      expect(wrapper.html()).toContain(`Test`);
    });

    it('should support other class constructors', () => {

      class MyBetterFormViewModel extends FormViewModel {
        mySpecialProp = {"name": "Mickey Mouse"}
      }

      const wrapper = shallow(
        <ModelForm initialValues={{name: "Harman"}} modelConstructor={MyBetterFormViewModel}>
          {({model}) => {
            return <div>Hello World {JSON.stringify(model.mySpecialProp)}</div>
          }}
        </ModelForm>
      );
      expect(wrapper).toBeDefined();
      expect(wrapper.html()).toContain(`Mickey Mouse`);
    });
  });


  it('should render w/o crashing', () => {
    const formViewModel = new FormViewModel();
    const wrapper = shallow(
      <ModelForm model={formViewModel}>Hello World</ModelForm>
    );
    expect(wrapper).toBeDefined();
  });

  it('should allow for onSubmitSuccess to be handled by the component', async () => {
    const formViewModel = new FormViewModel();
    const onSubmitSuccess = jest.fn();
    const wrapper = shallow(
      <ModelForm model={formViewModel} 
                 onSubmitSuccess={onSubmitSuccess}>
        <button onClick={e => formViewModel.handleSubmit(e)}>Submit</button>
      </ModelForm>
    );
    const button = wrapper.find('button');
    button.simulate('click');
    expect(wrapper).toBeDefined();
    await wait();
    expect(onSubmitSuccess).toHaveBeenCalled();
  });

  it('should allow for updated onSubmitSuccess to be handled by the component', async () => {
    const formViewModel = new FormViewModel();
    const onSubmitSuccess = jest.fn();
    const wrapper = shallow(
      <ModelForm model={formViewModel} 
                 onSubmitSuccess={onSubmitSuccess}>
        <button onClick={e => formViewModel.handleSubmit(e)}>Submit</button>
      </ModelForm>
    );
    const button = wrapper.find('button');
    button.simulate('click');
    expect(wrapper).toBeDefined();
    await wait();
    expect(onSubmitSuccess).toHaveBeenCalled();
    const newSubmitSuccess = jest.fn();
    wrapper.setProps({onSubmitSuccess: newSubmitSuccess });
    button.simulate('click');
    await wait();
    expect(newSubmitSuccess).toHaveBeenCalled();
  });

  it('should allow for onSubmitError to be handled by the component', async () => {
    const formViewModel = new FormViewModel();
    formViewModel.validate = () => ({"name": "Name is required"});
    const onSubmitError = jest.fn();
    const wrapper = shallow(
      <ModelForm model={formViewModel} 
                 onSubmitError={onSubmitError}>
        <button onClick={e => formViewModel.handleSubmit(e)}>Submit</button>
      </ModelForm>
    );
    const button = wrapper.find('button');
    button.simulate('click');
    expect(wrapper).toBeDefined();
    await wait();
    expect(onSubmitError).toHaveBeenCalled();
  });

  // See Field for ModelForm <=> Field interaction
});
