import { observer, Provider, inject } from 'mobx-react';
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
  parentModel?: FormViewModel;
  name?: string;
}

@inject((stores: any) => {
  return {parentModel: stores.model}
})
@observer
export default class ModelForm extends React.Component<ModelFormProps, any> {
  @observable model;

  generateModel() {
    const ModelConstructor = this.props.modelConstructor || FormViewModel;
    this.model = this.props.model || new ModelConstructor(this.props.initialValues);

    if (this.props.parentModel && this.props.name) {
      const parentModel = this.props.parentModel;
      parentModel.addChildFormModel(this.model, this.props.name);
    }
  }

  updateModel(props, prevProps: any = {}) {
    let initModel = false;
    if (!this.model) {
      this.generateModel();
      initModel = true;
    }


    const {onSubmitSuccess, onSubmitError} = props;
    const {model} = this;

    if (!initModel && prevProps.initialValues !== props.initialValues) {
      model.setValues(props.initialValues);
    }

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


  componentDidUpdate(prevProps) {
    this.updateModel(this.props, prevProps);
  }

  render() {
    const {children} = this.props;
    const {model} = this;

    if (!model) {
      return null;
    }

    return (
      <Provider model={model}>
        <React.Fragment>
          {isFunction(children) ? children({model}) : children}
        </React.Fragment>
      </Provider>
    );
  }
}