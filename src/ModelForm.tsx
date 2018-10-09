import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import FormViewModel from './FormViewModel';
import {isFunction} from 'lodash';
import { observable } from 'mobx';

export interface ModelFormProps {
  modelConstructor?: any;
  initialValues?: any;
  model?: FormViewModel;
  onSubmitSuccess?;
  onSubmitError?;
}

@observer
export default class ModelForm extends React.Component<ModelFormProps, any> {
  @observable model;

  generateModel() {
    const ModelConstructor = this.props.modelConstructor || FormViewModel;
    this.model = this.props.model || new ModelConstructor(this.props.initialValues);
  }

  updateModel(props) {
    if (!this.model) {
      this.generateModel();
    }


    const {onSubmitSuccess, onSubmitError} = props;
    const {model} = this;

    if (onSubmitSuccess) {
      model.onSubmitSuccess = onSubmitSuccess.bind(model);
    }

    if (onSubmitError) {
      model.onSubmitError = onSubmitError.bind(model);
    }
  }

  componentDidMount() {
    this.updateModel(this.props);
  }

  componentDidUpdate() {
    this.updateModel(this.props);
  }

  render() {
    const {children} = this.props;
    const {model} = this;

    if (!model) {
      return null;
    }

    return (
      <Provider model={model}>
        {isFunction(children) ? children({model}) : children}
      </Provider>
    );
  }
}
