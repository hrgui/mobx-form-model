
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { getIn, isFunction, isString } from './utils';
import filterReactProps from 'filter-react-props';
import { toJS, isObservable } from 'mobx';

@inject('model')
@observer
export default class Field extends React.Component<any, any> {
  render() {
    const {
      type,
      name,
      value,
      component = 'input',
      render,
      model
    } = this.props;
    let modelValue = getIn(model.values, name);
    const v = (type === 'radio' || type === 'checkbox'
          ? value
          : modelValue) || '';
    const defaultProps: any = {
      defaultValue: v,
      // why OR '' so we dont get uncontrolled error
      value:v,
      onChange: model.handleChange,
      onBlur: model.handleBlur
    };

    if (type === 'radio') {
      defaultProps.checked = modelValue === this.props.value;
    }

    const props = {
      ...defaultProps,
      ...this.props
    };

    if (isObservable(props.value) && !this.props.bindValueToMobx) {
      props.value = toJS(props.value);
    }

    if (isFunction(render)) {
      return render(props);
    }

    let finalProps = isString(component)
      ? filterReactProps(props)
      : props;

    if (!isString(component)) {
      delete finalProps.component;
    }

    return React.createElement(component, {
      ...finalProps
    });
  }
}
