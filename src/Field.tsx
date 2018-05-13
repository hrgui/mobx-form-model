import { ModelFormContext } from './ModelForm';
import * as React from 'react';
import { Observer, observer } from 'mobx-react';
import { getIn } from './utils';


// function getCheckedValue(type, value) {
//   if (type === 'radio') {
//     return value
//   }
// }


@observer
export default class Field extends React.Component<any, any> {
  count = 0;
  render() {
    return <ModelFormContext.Consumer>
      {(model) => {
        if (!model) {
          return null;
        }


        return <Observer>
          {() => {

            const { type, name, value } = this.props;
            const modelValue = getIn(model.values, name);
            const defaultProps = {
              // why OR '' so we dont get uncontrolled error
              value: (type === 'radio' || type === 'checkbox' ? value : modelValue) || '',
              onChange: model.handleChange,
              onBlur: model.handleBlur,
              checked: type === 'radio' ? modelValue === this.props.value : undefined
            };

            return <React.Fragment>
              <input {...defaultProps}
                {...this.props} />
              {this.count += 1}
            </React.Fragment>
          }}

        </Observer>
      }}
    </ModelFormContext.Consumer>
  }
};