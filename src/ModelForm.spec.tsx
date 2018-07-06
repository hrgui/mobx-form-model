import * as React from 'react';
import { shallow } from 'enzyme';
import ModelForm from './ModelForm';
import FormViewModel from './FormViewModel';

describe('ModelForm', () => {
  it('should render w/o crashing', () => {
    const formViewModel = new FormViewModel();
    const wrapper = shallow(
      <ModelForm model={formViewModel}>Hello World</ModelForm>
    );
    expect(wrapper).toBeDefined();
  });

  // See Field for ModelForm <=> Field interaction
});
