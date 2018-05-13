import {observer} from 'mobx-react';
import * as React from 'react';
import FormViewModel from './FormViewModel';
export const ModelFormContext = React.createContext<FormViewModel>(null);

export interface ModelFormProps {
  model?: FormViewModel;
}


@observer
export default class ModelForm extends React.Component<ModelFormProps, any> {
  render() {
    return <ModelFormContext.Provider value={this.props.model}>
      {this.props.children}
    </ModelFormContext.Provider>
  }
};