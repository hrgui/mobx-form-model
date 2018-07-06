export default interface FormViewModel {
    /**
     * This method runs on every form update.
     * If this returns an object that has values, the form will be in an invalid state.
     */
    validate?: ((values: any) => any);
    /**
     * This method runs on every form update as well.
     * The difference here is that this is a validationSchema that is provided by yup.
     * It can be either a function or not.
     */
    validationSchema: any | (() => any);
    /**
     * When the user presses the cancel button, currently it will do nothing.
     */
    onCancel?: (() => any);
    /**
     * When the user has succesfully saved the form
     * @param response
     */
    onSubmitSuccess(response: any): any;
    /**
     * When the user has passed validation and is now going to submit.
     */
    onSubmit(values?: any): any;
}
export default class FormViewModel {
    /**
     * This is the initial state of the form. This gets copied over to `values` in constructor runtime. On reset, this is used to reset the values to an initial state.
     */
    initialValues: any;
    /**
     * These are the values of the form - the current state. Note that unlike formik, the values change automatically instead of waiting on the next render cycle - so there's a huge difference there.
     */
    values: any;
    /**
     * This is used when any of the fields mentioned are touched; meaning interacted with. By default, `<Field />` uses onBlur for this event.
     */
    touched: {};
    /**
     * This is an object that consists of all the errors.
     */
    errors: {};
    /**
     * This is true when the form is currently submitting, false otherwise.
     */
    isSubmitting: boolean;
    /**
     * This is to keep track of how many times the user clicked on the submit.
     */
    submitCount: number;
    constructor(values: any);
    /**
     * Determines if the form is valid.
     */
    readonly isValid: boolean;
    /**
     * This is a generic method to get the value from inputEvent.
     * The code tries to pass in e.target into target, but if target doesn't exist, target is the event
     * property.
     *
     * Now if neither doesn't work, use other to figure out what should be returned as a value to the model.
     *
     * @param target
     * @param other
     */
    getValueFromInputEvent(target: any, ...other: any[]): any;
    /**
     * This gets the name to be applied to the values property.
     * By default, it will assume name as the property, but if id is present it will use that too.
     * @param target
     * @param other
     */
    getNameFromInputEvent(target: any, ...other: any[]): any;
    /**
     * This method is the default handler for handling change events.
     */
    handleChange(e: any, ...other: any[]): void;
    /**
     * This method is the default handler for handling blur events.
     */
    handleBlur(e: any, ...other: any[]): void;
    /**
     * This method sets a field value explicitly.
     * The added benefit is that validations will be run after setFieldValue is called.
     * Note that setFieldValue will automatically do the change immediately; there is no need to wait for another cycle.
     */
    setFieldValue(name: any, value: any): void;
    /**
     * This method sets all field values explicitly.
     * Note that this will cause every form value to re-render, because the entire values object has changed.
     * The added benefit is that validations will be run after setValues is called.
     * Note that setValues will automatically do the change immediately; there is no need to wait for another cycle.
     */
    setValues(values: any): void;
    /**
     * This method sets a single field touched value explicitly.
     * The added benefit is that validations will be run after setFieldTouched is called.
     * Note that setFieldTouched will automatically do the change immediately; there is no need to wait for another cycle.
     */
    setFieldTouched(name: any, value: any): void;
    /**
     * This method sets a single field error value explicitly.
     * Note that setFieldError will automatically do the change immediately; there is no need to wait for another cycle.
     */
    setFieldError(name: any, value: any): void;
    /**
     * This method changes all the errors explicilty.
     * Note that setErrors will automatically do all the changes immediately, no need to wait for another cycle.
     */
    setErrors(errors: any): void;
    /**
     * Sets the form as currently being submitted or not.
     * @param value
     */
    setSubmitting(value: any): void;
    /**
     * This method is the core method for all the validations to run.
     * It returns a boolean: if its true then the form is valid, false otherwise.
     * @param values
     */
    runValidations(values?: any): Promise<boolean>;
    /**
     * By default, this resets the form to a pristine state. If this method is overridden, please call `super.onReset()` to get to an initial state.
     */
    onReset(): void;
    /**
     * This method handles the submit event.
     * @param e
     */
    handleSubmit(e: any): Promise<void>;
    /**
     * This method handles the reset event.
     */
    protected handleReset(): void;
    /**
     * This method handles the cancel event.
     */
    protected handleCancel(): void;
    /**
     * This method is the main submitForm handler when the submit event is invoked.
     * 1. We set all form values as touched
     * 2. We set isSubmitting = true then set it to false afterward.
     */
    protected submitForm(): Promise<void>;
    /**
     * When the user submits but an error occurs, by default it will just throw a console.error.
     * @param e
     */
    onSubmitError(e: any): void;
    /**
     * This runs the validation schema and translates it to a more readable form that mobx-form-model can present.
     * @param values
     */
    private runValidationSchema;
    /**
     * This method sets a value in any object here w/ mobx. It uses set if the value is defined, it overwrites the entire thing
     * otherwise.
     * @param prop
     * @param name
     * @param value
     */
    private setInMobx;
}
