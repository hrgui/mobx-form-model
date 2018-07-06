import * as React from 'react';
import FormViewModel from './FormViewModel';
export declare const ModelFormContext: React.Context<FormViewModel>;
export interface ModelFormProps {
    model?: FormViewModel;
}
export default class ModelForm extends React.Component<ModelFormProps, any> {
    render(): JSX.Element;
}
