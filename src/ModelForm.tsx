import {observer} from 'mobx-react';
import * as React from 'react';
import FormViewModel from './FormViewModel';
export const ModelFormContext = React.createContext<ModelFormProps>(null);

export interface ModelFormProps {
  model?: FormViewModel;
}


@observer
export default class ModelForm extends React.Component<ModelFormProps, any> {
  render() {
    const {children, ...propsToSend} = this.props;
    return <ModelFormContext.Provider value={{model: this.props.model, ...propsToSend}}>
      {children}
    </ModelFormContext.Provider>
  }
};