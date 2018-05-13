import { ModelFormContext } from './ModelForm';
import * as React from 'react';
import { Observer, observer } from 'mobx-react';
import { getIn, isFunction } from './utils';
import filterReactProps from 'filter-react-props';


@observer
export default class Field extends React.Component<any, any> {
  rendercount = 0;
  render() {
    return <ModelFormContext.Consumer>
      {(model) => {
        if (!model) {
          return null;
        }
        return <Observer>
          {() => {
            const { type, name, value, component = 'input', render } = this.props;
            const modelValue = getIn(model.values, name);
            const defaultProps = {
              // why OR '' so we dont get uncontrolled error
              value: (type === 'radio' || type === 'checkbox' ? value : modelValue) || '',
              onChange: model.handleChange,
              onBlur: model.handleBlur,
              checked: type === 'radio' ? modelValue === this.props.value : undefined
            };

            const props = {...defaultProps, ...this.props, model, _rendercount: this.rendercount};

            this.rendercount += 1;

            if (isFunction(render)) {
              return render(props);
            }

            

            return React.createElement(component, {...filterReactProps(props), _rendercount: this.rendercount});
          }}
        </Observer>
      }}
    </ModelFormContext.Consumer>
  }
};