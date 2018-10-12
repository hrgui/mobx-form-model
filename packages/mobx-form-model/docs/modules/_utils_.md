[@hrgui/mobx-form-model](../README.md) > ["utils"](../modules/_utils_.md)

# External module: "utils"

## Index

### Functions

* [getIn](_utils_.md#getin)
* [isEmptyChildren](_utils_.md#isemptychildren)
* [isFunction](_utils_.md#isfunction)
* [isInteger](_utils_.md#isinteger)
* [isNaN](_utils_.md#isnan)
* [isObject](_utils_.md#isobject)
* [isPromise](_utils_.md#ispromise)
* [isString](_utils_.md#isstring)
* [setIn](_utils_.md#setin)
* [setNestedObjectValues](_utils_.md#setnestedobjectvalues)
* [validateYupSchema](_utils_.md#validateyupschema)
* [yupToFormErrors](_utils_.md#yuptoformerrors)

---

## Functions

<a id="getin"></a>

###  getIn

▸ **getIn**(obj: *`any`*, key: * `string` &#124; `string`[]*, def?: *`any`*, p?: *`number`*): `any`

*Defined in [utils.ts:7](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L7)*

Deeply get a value from an object via it's path.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| obj | `any` | - |
| key |  `string` &#124; `string`[]| - |
| `Optional` def | `any` | - |
| `Default value` p | `number` | 0 |

**Returns:** `any`

___
<a id="isemptychildren"></a>

### `<Private>``<Const>` isEmptyChildren

▸ **isEmptyChildren**(children: *`any`*): `boolean`

*Defined in [utils.ts:103](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L103)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| children | `any` |

**Returns:** `boolean`

___
<a id="isfunction"></a>

### `<Private>``<Const>` isFunction

▸ **isFunction**(obj: *`any`*): `boolean`

*Defined in [utils.ts:84](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L84)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| obj | `any` |

**Returns:** `boolean`

___
<a id="isinteger"></a>

### `<Private>``<Const>` isInteger

▸ **isInteger**(obj: *`any`*): `boolean`

*Defined in [utils.ts:92](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L92)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| obj | `any` |

**Returns:** `boolean`

___
<a id="isnan"></a>

### `<Private>``<Const>` isNaN

▸ **isNaN**(obj: *`any`*): `boolean`

*Defined in [utils.ts:100](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L100)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| obj | `any` |

**Returns:** `boolean`

___
<a id="isobject"></a>

### `<Private>``<Const>` isObject

▸ **isObject**(obj: *`any`*): `boolean`

*Defined in [utils.ts:88](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L88)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| obj | `any` |

**Returns:** `boolean`

___
<a id="ispromise"></a>

### `<Private>``<Const>` isPromise

▸ **isPromise**(value: *`any`*): `boolean`

*Defined in [utils.ts:107](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L107)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="isstring"></a>

### `<Private>``<Const>` isString

▸ **isString**(obj: *`any`*): `boolean`

*Defined in [utils.ts:96](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L96)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| obj | `any` |

**Returns:** `boolean`

___
<a id="setin"></a>

###  setIn

▸ **setIn**(obj: *`any`*, path: *`string`*, value: *`any`*): `any`

*Defined in [utils.ts:24](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L24)*

Deeply set a value from in object via it's path.
*__see__*: [https://github.com/developit/linkstate](https://github.com/developit/linkstate)

**Parameters:**

| Param | Type |
| ------ | ------ |
| obj | `any` |
| path | `string` |
| value | `any` |

**Returns:** `any`

___
<a id="setnestedobjectvalues"></a>

###  setNestedObjectValues

▸ **setNestedObjectValues**T(object: *`any`*, value: *`any`*, visited?: *`any`*, response?: *`any`*): `T`

*Defined in [utils.ts:56](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L56)*

Recursively a set the same value for all keys and arrays nested object, cloning

**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| object | `any` | - |  - |
| value | `any` | - |  - |
| `Default value` visited | `any` |  new WeakMap() |  - |
| `Default value` response | `any` |  {} |   |

**Returns:** `T`

___
<a id="validateyupschema"></a>

###  validateYupSchema

▸ **validateYupSchema**(values: *`any`*, schema: *`any`*, sync?: *`boolean`*, context?: *`object`*): `any`

*Defined in [utils.ts:126](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L126)*

Validate a yup schema.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| values | `any` | - |
| schema | `any` | - |
| `Default value` sync | `boolean` | false |
| `Default value` context | `object` |  {} |

**Returns:** `any`

___
<a id="yuptoformerrors"></a>

###  yupToFormErrors

▸ **yupToFormErrors**(yupError: *`any`*): `object`

*Defined in [utils.ts:113](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/utils.ts#L113)*

Transform Yup ValidationError to a more usable object

**Parameters:**

| Param | Type |
| ------ | ------ |
| yupError | `any` |

**Returns:** `object`

___

