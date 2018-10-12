[@hrgui/mobx-form-model](../README.md) > ["FormViewModel"](../modules/_formviewmodel_.md) > [FormViewModel](../classes/_formviewmodel_.formviewmodel.md)

# Class: FormViewModel

## Hierarchy

**FormViewModel**

## Index

### Constructors

* [constructor](_formviewmodel_.formviewmodel.md#constructor)

### Properties

* [errors](_formviewmodel_.formviewmodel.md#errors)
* [initialValues](_formviewmodel_.formviewmodel.md#initialvalues)
* [isSubmitting](_formviewmodel_.formviewmodel.md#issubmitting)
* [onCancel](_formviewmodel_.formviewmodel.md#oncancel)
* [submitCount](_formviewmodel_.formviewmodel.md#submitcount)
* [touched](_formviewmodel_.formviewmodel.md#touched)
* [validate](_formviewmodel_.formviewmodel.md#validate)
* [validationSchema](_formviewmodel_.formviewmodel.md#validationschema)

### Accessors

* [isValid](_formviewmodel_.formviewmodel.md#isvalid)

### Methods

* [getNameFromInputEvent](_formviewmodel_.formviewmodel.md#getnamefrominputevent)
* [getValueFromInputEvent](_formviewmodel_.formviewmodel.md#getvaluefrominputevent)
* [handleBlur](_formviewmodel_.formviewmodel.md#handleblur)
* [handleCancel](_formviewmodel_.formviewmodel.md#handlecancel)
* [handleChange](_formviewmodel_.formviewmodel.md#handlechange)
* [handleReset](_formviewmodel_.formviewmodel.md#handlereset)
* [handleSubmit](_formviewmodel_.formviewmodel.md#handlesubmit)
* [onReset](_formviewmodel_.formviewmodel.md#onreset)
* [onSubmit](_formviewmodel_.formviewmodel.md#onsubmit)
* [onSubmitError](_formviewmodel_.formviewmodel.md#onsubmiterror)
* [onSubmitSuccess](_formviewmodel_.formviewmodel.md#onsubmitsuccess)
* [runValidationSchema](_formviewmodel_.formviewmodel.md#runvalidationschema)
* [runValidations](_formviewmodel_.formviewmodel.md#runvalidations)
* [setErrors](_formviewmodel_.formviewmodel.md#seterrors)
* [setFieldError](_formviewmodel_.formviewmodel.md#setfielderror)
* [setFieldTouched](_formviewmodel_.formviewmodel.md#setfieldtouched)
* [setFieldValue](_formviewmodel_.formviewmodel.md#setfieldvalue)
* [setInMobx](_formviewmodel_.formviewmodel.md#setinmobx)
* [setSubmitting](_formviewmodel_.formviewmodel.md#setsubmitting)
* [setValues](_formviewmodel_.formviewmodel.md#setvalues)
* [submitForm](_formviewmodel_.formviewmodel.md#submitform)

### Object literals

* [values](_formviewmodel_.formviewmodel.md#values)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new FormViewModel**(values: *`any`*): [FormViewModel](_formviewmodel_.formviewmodel.md)

*Defined in [FormViewModel.ts:64](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L64)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| values | `any` |

**Returns:** [FormViewModel](_formviewmodel_.formviewmodel.md)

___

## Properties

<a id="errors"></a>

###  errors

**● errors**: *`object`*

*Defined in [FormViewModel.ts:56](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L56)*

This is an object that consists of all the errors.

#### Type declaration

___
<a id="initialvalues"></a>

###  initialValues

**● initialValues**: *`any`*

*Defined in [FormViewModel.ts:44](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L44)*

This is the initial state of the form. This gets copied over to `values` in constructor runtime. On reset, this is used to reset the values to an initial state.

___
<a id="issubmitting"></a>

###  isSubmitting

**● isSubmitting**: *`boolean`* = false

*Defined in [FormViewModel.ts:60](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L60)*

This is true when the form is currently submitting, false otherwise.

___
<a id="oncancel"></a>

### `<Optional>` onCancel

**● onCancel**: *`function`*

*Defined in [FormViewModel.ts:27](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L27)*

When the user presses the cancel button, currently it will do nothing.

#### Type declaration
▸(): `any`

**Returns:** `any`

___
<a id="submitcount"></a>

###  submitCount

**● submitCount**: *`number`* = 0

*Defined in [FormViewModel.ts:64](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L64)*

This is to keep track of how many times the user clicked on the submit.

___
<a id="touched"></a>

###  touched

**● touched**: *`object`*

*Defined in [FormViewModel.ts:52](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L52)*

This is used when any of the fields mentioned are touched; meaning interacted with. By default, `<Field />` uses onBlur for this event.

#### Type declaration

___
<a id="validate"></a>

### `<Optional>` validate

**● validate**: *`function`*

*Defined in [FormViewModel.ts:17](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L17)*

This method runs on every form update. If this returns an object that has values, the form will be in an invalid state.

#### Type declaration
▸(values: *`any`*): `any`

**Parameters:**

| Param | Type |
| ------ | ------ |
| values | `any` |

**Returns:** `any`

___
<a id="validationschema"></a>

###  validationSchema

**● validationSchema**: * `any` &#124; `function`
*

*Defined in [FormViewModel.ts:23](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L23)*

This method runs on every form update as well. The difference here is that this is a validationSchema that is provided by yup. It can be either a function or not.

___

## Accessors

<a id="isvalid"></a>

###  isValid

getisValid(): `boolean`

*Defined in [FormViewModel.ts:86](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L86)*

Determines if the form is valid.

**Returns:** `boolean`

___

## Methods

<a id="getnamefrominputevent"></a>

###  getNameFromInputEvent

▸ **getNameFromInputEvent**(target: *`any`*, ...other: *`any`[]*): `any`

*Defined in [FormViewModel.ts:123](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L123)*

This gets the name to be applied to the values property. By default, it will assume name as the property, but if id is present it will use that too.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any` |  - |
| `Rest` other | `any`[] |   |

**Returns:** `any`

___
<a id="getvaluefrominputevent"></a>

###  getValueFromInputEvent

▸ **getValueFromInputEvent**(target: *`any`*, ...other: *`any`[]*): `any`

*Defined in [FormViewModel.ts:100](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L100)*

This is a generic method to get the value from inputEvent. The code tries to pass in e.target into target, but if target doesn't exist, target is the event property.

Now if neither doesn't work, use other to figure out what should be returned as a value to the model.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any` |  - |
| `Rest` other | `any`[] |   |

**Returns:** `any`

___
<a id="handleblur"></a>

###  handleBlur

▸ **handleBlur**(e: *`any`*, ...other: *`any`[]*): `void`

*Defined in [FormViewModel.ts:144](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L144)*

This method is the default handler for handling blur events.

**Parameters:**

| Param | Type |
| ------ | ------ |
| e | `any` |
| `Rest` other | `any`[] |

**Returns:** `void`

___
<a id="handlecancel"></a>

### `<Protected>` handleCancel

▸ **handleCancel**(): `void`

*Defined in [FormViewModel.ts:262](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L262)*

This method handles the cancel event.

**Returns:** `void`

___
<a id="handlechange"></a>

###  handleChange

▸ **handleChange**(e: *`any`*, ...other: *`any`[]*): `void`

*Defined in [FormViewModel.ts:131](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L131)*

This method is the default handler for handling change events.

**Parameters:**

| Param | Type |
| ------ | ------ |
| e | `any` |
| `Rest` other | `any`[] |

**Returns:** `void`

___
<a id="handlereset"></a>

### `<Protected>` handleReset

▸ **handleReset**(): `void`

*Defined in [FormViewModel.ts:253](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L253)*

This method handles the reset event.

**Returns:** `void`

___
<a id="handlesubmit"></a>

###  handleSubmit

▸ **handleSubmit**(e: *`any`*): `Promise`<`void`>

*Defined in [FormViewModel.ts:242](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L242)*

This method handles the submit event.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| e | `any` |   |

**Returns:** `Promise`<`void`>

___
<a id="onreset"></a>

###  onReset

▸ **onReset**(): `void`

*Defined in [FormViewModel.ts:230](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L230)*

By default, this resets the form to a pristine state. If this method is overridden, please call `super.onReset()` to get to an initial state.

**Returns:** `void`

___
<a id="onsubmit"></a>

###  onSubmit

▸ **onSubmit**(values?: *`any`*): `any`

*Defined in [FormViewModel.ts:37](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L37)*

When the user has passed validation and is now going to submit.

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` values | `any` |

**Returns:** `any`

___
<a id="onsubmiterror"></a>

###  onSubmitError

▸ **onSubmitError**(e: *`any`*): `void`

*Defined in [FormViewModel.ts:300](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L300)*

When the user submits but an error occurs, by default it will just throw a console.error.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| e | `any` |   |

**Returns:** `void`

___
<a id="onsubmitsuccess"></a>

###  onSubmitSuccess

▸ **onSubmitSuccess**(response: *`any`*): `any`

*Defined in [FormViewModel.ts:33](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L33)*

When the user has succesfully saved the form

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| response | `any` |   |

**Returns:** `any`

___
<a id="runvalidationschema"></a>

### `<Private>` runValidationSchema

▸ **runValidationSchema**(values: *`any`*): `Promise`<`object`>

*Defined in [FormViewModel.ts:308](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L308)*

This runs the validation schema and translates it to a more readable form that mobx-form-model can present.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `any` |   |

**Returns:** `Promise`<`object`>

___
<a id="runvalidations"></a>

###  runValidations

▸ **runValidations**(values?: *`any`*): `Promise`<`boolean`>

*Defined in [FormViewModel.ts:210](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L210)*

This method is the core method for all the validations to run. It returns a boolean: if its true then the form is valid, false otherwise.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` values | `any` |  this.values |   |

**Returns:** `Promise`<`boolean`>

___
<a id="seterrors"></a>

###  setErrors

▸ **setErrors**(errors: *`any`*): `void`

*Defined in [FormViewModel.ts:193](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L193)*

This method changes all the errors explicilty. Note that setErrors will automatically do all the changes immediately, no need to wait for another cycle.

**Parameters:**

| Param | Type |
| ------ | ------ |
| errors | `any` |

**Returns:** `void`

___
<a id="setfielderror"></a>

###  setFieldError

▸ **setFieldError**(name: *`any`*, value: *`any`*): `void`

*Defined in [FormViewModel.ts:185](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L185)*

This method sets a single field error value explicitly. Note that setFieldError will automatically do the change immediately; there is no need to wait for another cycle.

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="setfieldtouched"></a>

###  setFieldTouched

▸ **setFieldTouched**(name: *`any`*, value: *`any`*): `void`

*Defined in [FormViewModel.ts:176](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L176)*

This method sets a single field touched value explicitly. The added benefit is that validations will be run after setFieldTouched is called. Note that setFieldTouched will automatically do the change immediately; there is no need to wait for another cycle.

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="setfieldvalue"></a>

###  setFieldValue

▸ **setFieldValue**(name: *`any`*, value: *`any`*): `void`

*Defined in [FormViewModel.ts:155](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L155)*

This method sets a field value explicitly. The added benefit is that validations will be run after setFieldValue is called. Note that setFieldValue will automatically do the change immediately; there is no need to wait for another cycle.

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="setinmobx"></a>

### `<Private>` setInMobx

▸ **setInMobx**(prop: *`any`*, name: *`any`*, value: *`any`*): `any`

*Defined in [FormViewModel.ts:328](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L328)*

This method sets a value in any object here w/ mobx. It uses set if the value is defined, it overwrites the entire thing otherwise.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| prop | `any` |  - |
| name | `any` |  - |
| value | `any` |   |

**Returns:** `any`

___
<a id="setsubmitting"></a>

###  setSubmitting

▸ **setSubmitting**(value: *`any`*): `void`

*Defined in [FormViewModel.ts:201](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L201)*

Sets the form as currently being submitted or not.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any` |   |

**Returns:** `void`

___
<a id="setvalues"></a>

###  setValues

▸ **setValues**(values: *`any`*): `void`

*Defined in [FormViewModel.ts:166](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L166)*

This method sets all field values explicitly. Note that this will cause every form value to re-render, because the entire values object has changed. The added benefit is that validations will be run after setValues is called. Note that setValues will automatically do the change immediately; there is no need to wait for another cycle.

**Parameters:**

| Param | Type |
| ------ | ------ |
| values | `any` |

**Returns:** `void`

___
<a id="submitform"></a>

### `<Protected>` submitForm

▸ **submitForm**(): `Promise`<`void`>

*Defined in [FormViewModel.ts:273](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L273)*

This method is the main submitForm handler when the submit event is invoked.

1.  We set all form values as touched
2.  We set isSubmitting = true then set it to false afterward.

**Returns:** `Promise`<`void`>

___

## Object literals

<a id="values"></a>

###  values

**values**: *`object`*

*Defined in [FormViewModel.ts:48](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/FormViewModel.ts#L48)*

These are the values of the form - the current state. Note that unlike formik, the values change automatically instead of waiting on the next render cycle - so there's a huge difference there.

___

