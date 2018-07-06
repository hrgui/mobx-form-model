import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Field from './Field';
import ModelForm from './ModelForm';
import FormViewModel from './FormViewModel';

describe('Field', () => {
  it('should render null w/o ModelForm', () => {
    const tree = renderer.create(<Field />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe('Field <=> ModelForm', () => {
    it('should render basic types easily (text, number, radio)', () => {
      const formViewModel = new FormViewModel();
      formViewModel.setFieldValue('name', 'Mickey Mouse');
      formViewModel.setFieldValue('age', 100);
      formViewModel.setFieldValue('gender', 'male');
      formViewModel.setFieldValue('isCartoon', true);
      const tree = renderer
        .create(
          <ModelForm model={formViewModel}>
            <Field name="name" />
            <Field name="age" type="number" />
            <Field name="gender" value="male" type="radio" />
            <Field name="gender" value="female" type="radio" />
            <Field name="isCartoon" />
          </ModelForm>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render basic types easily with a custom type in addition', () => {
      const formViewModel = new FormViewModel();
      formViewModel.setFieldValue('name', 'Mickey Mouse');
      formViewModel.setFieldValue('age', 100);
      formViewModel.setFieldValue('gender', 'male');
      formViewModel.setFieldValue('isCartoon', true);
      const ReadOnlyComponent = ({ value }) => {
        return value;
      };
      const tree = renderer
        .create(
          <ModelForm model={formViewModel}>
            <Field name="name" />
            <Field name="gender" component={ReadOnlyComponent} />
          </ModelForm>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support nested values', () => {
      const formViewModel = new FormViewModel();
      formViewModel.setFieldValue('personal', {
        name: 'Mickey Mouse'
      });
      const tree = renderer
        .create(
          <ModelForm model={formViewModel}>
            <Field name="personal.name" />
          </ModelForm>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
