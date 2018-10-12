[@hrgui/mobx-form-model](../README.md) > ["Field"](../modules/_field_.md) > [Field](../classes/_field_.field.md)

# Class: Field

## Type parameters
#### SS 
## Hierarchy

 `Component`<`any`, `any`>

**↳ Field**

## Index

### Constructors

* [constructor](_field_.field.md#constructor)

### Properties

* [context](_field_.field.md#context)
* [props](_field_.field.md#props)
* [refs](_field_.field.md#refs)
* [state](_field_.field.md#state)

### Methods

* [forceUpdate](_field_.field.md#forceupdate)
* [render](_field_.field.md#render)
* [setState](_field_.field.md#setstate)
* [UNSAFE_componentWillMount](_field_.field.md#unsafe_componentwillmount)
* [UNSAFE_componentWillReceiveProps](_field_.field.md#unsafe_componentwillreceiveprops)
* [UNSAFE_componentWillUpdate](_field_.field.md#unsafe_componentwillupdate)
* [componentDidCatch](_field_.field.md#componentdidcatch)
* [componentDidMount](_field_.field.md#componentdidmount)
* [componentDidUpdate](_field_.field.md#componentdidupdate)
* [componentWillMount](_field_.field.md#componentwillmount)
* [componentWillReceiveProps](_field_.field.md#componentwillreceiveprops)
* [componentWillUnmount](_field_.field.md#componentwillunmount)
* [componentWillUpdate](_field_.field.md#componentwillupdate)
* [getSnapshotBeforeUpdate](_field_.field.md#getsnapshotbeforeupdate)
* [shouldComponentUpdate](_field_.field.md#shouldcomponentupdate)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Field**(props: *`Readonly`<`any`>*): [Field](_field_.field.md)

⊕ **new Field**(props: *`any`*, context?: *`any`*): [Field](_field_.field.md)

*Inherited from Component.__constructor*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:284*

**Parameters:**

| Param | Type |
| ------ | ------ |
| props | `Readonly`<`any`> |

**Returns:** [Field](_field_.field.md)

*Inherited from Component.__constructor*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:285*

*__deprecated__*: [https://reactjs.org/docs/legacy-context.html](https://reactjs.org/docs/legacy-context.html)

**Parameters:**

| Param | Type |
| ------ | ------ |
| props | `any` |
| `Optional` context | `any` |

**Returns:** [Field](_field_.field.md)

___

## Properties

<a id="context"></a>

###  context

**● context**: *`any`*

*Inherited from Component.context*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:314*

*__deprecated__*: [https://reactjs.org/docs/legacy-context.html](https://reactjs.org/docs/legacy-context.html)

___
<a id="props"></a>

###  props

**● props**: * `Readonly`<`object`> & `Readonly`<`any`>
*

*Inherited from Component.props*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:308*

___
<a id="refs"></a>

###  refs

**● refs**: *`object`*

*Inherited from Component.refs*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:319*

*__deprecated__*: [https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs)

#### Type declaration

[key: `string`]: `ReactInstance`

___
<a id="state"></a>

###  state

**● state**: *`Readonly`<`any`>*

*Inherited from Component.state*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:309*

___

## Methods

<a id="forceupdate"></a>

###  forceUpdate

▸ **forceUpdate**(callBack?: *`function`*): `void`

*Inherited from Component.forceUpdate*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:300*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` callBack | `function` |

**Returns:** `void`

___
<a id="render"></a>

###  render

▸ **render**(): `Element`

*Overrides Component.render*

*Defined in [Field.tsx:10](https://github.com/hrgui/mobx-form-model/blob/9bd1f97/src/Field.tsx#L10)*

**Returns:** `Element`

___
<a id="setstate"></a>

###  setState

▸ **setState**K(state: * `function` &#124;  `S` &#124; `object`*, callback?: *`function`*): `void`

*Inherited from Component.setState*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:295*

**Type parameters:**

#### K :  `keyof any`
**Parameters:**

| Param | Type |
| ------ | ------ |
| state |  `function` &#124;  `S` &#124; `object`|
| `Optional` callback | `function` |

**Returns:** `void`

___
<a id="unsafe_componentwillmount"></a>

### `<Static>``<Optional>` UNSAFE_componentWillMount

▸ **UNSAFE_componentWillMount**(): `void`

*Inherited from DeprecatedLifecycle.UNSAFE_componentWillMount*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:474*

Called immediately before mounting occurs, and before `Component#render`. Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
*__deprecated__*: 16.3, use componentDidMount or the constructor instead

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

**Returns:** `void`

___
<a id="unsafe_componentwillreceiveprops"></a>

### `<Static>``<Optional>` UNSAFE_componentWillReceiveProps

▸ **UNSAFE_componentWillReceiveProps**(nextProps: *`Readonly`<`any`>*, nextContext: *`any`*): `void`

*Inherited from DeprecatedLifecycle.UNSAFE_componentWillReceiveProps*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:506*

Called when the component may be receiving new props. React may call this even if props have not changed, so be sure to compare new and existing props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
*__deprecated__*: 16.3, use static getDerivedStateFromProps instead

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

**Parameters:**

| Param | Type |
| ------ | ------ |
| nextProps | `Readonly`<`any`> |
| nextContext | `any` |

**Returns:** `void`

___
<a id="unsafe_componentwillupdate"></a>

### `<Static>``<Optional>` UNSAFE_componentWillUpdate

▸ **UNSAFE_componentWillUpdate**(nextProps: *`Readonly`<`any`>*, nextState: *`Readonly`<`any`>*, nextContext: *`any`*): `void`

*Inherited from DeprecatedLifecycle.UNSAFE_componentWillUpdate*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:534*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
*__deprecated__*: 16.3, use getSnapshotBeforeUpdate instead

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

**Parameters:**

| Param | Type |
| ------ | ------ |
| nextProps | `Readonly`<`any`> |
| nextState | `Readonly`<`any`> |
| nextContext | `any` |

**Returns:** `void`

___
<a id="componentdidcatch"></a>

### `<Static>``<Optional>` componentDidCatch

▸ **componentDidCatch**(error: *`Error`*, errorInfo: *`ErrorInfo`*): `void`

*Inherited from ComponentLifecycle.componentDidCatch*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:413*

Catches exceptions generated in descendant components. Unhandled exceptions will cause the entire component tree to unmount.

**Parameters:**

| Param | Type |
| ------ | ------ |
| error | `Error` |
| errorInfo | `ErrorInfo` |

**Returns:** `void`

___
<a id="componentdidmount"></a>

### `<Static>``<Optional>` componentDidMount

▸ **componentDidMount**(): `void`

*Inherited from ComponentLifecycle.componentDidMount*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:392*

Called immediately after a compoment is mounted. Setting state here will trigger re-rendering.

**Returns:** `void`

___
<a id="componentdidupdate"></a>

### `<Static>``<Optional>` componentDidUpdate

▸ **componentDidUpdate**(prevProps: *`Readonly`<`any`>*, prevState: *`Readonly`<`any`>*, snapshot?: *`SS`*): `void`

*Inherited from NewLifecycle.componentDidUpdate*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:445*

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

**Parameters:**

| Param | Type |
| ------ | ------ |
| prevProps | `Readonly`<`any`> |
| prevState | `Readonly`<`any`> |
| `Optional` snapshot | `SS` |

**Returns:** `void`

___
<a id="componentwillmount"></a>

### `<Static>``<Optional>` componentWillMount

▸ **componentWillMount**(): `void`

*Inherited from DeprecatedLifecycle.componentWillMount*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:460*

Called immediately before mounting occurs, and before `Component#render`. Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
*__deprecated__*: 16.3, use componentDidMount or the constructor instead; will stop working in React 17

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

**Returns:** `void`

___
<a id="componentwillreceiveprops"></a>

### `<Static>``<Optional>` componentWillReceiveProps

▸ **componentWillReceiveProps**(nextProps: *`Readonly`<`any`>*, nextContext: *`any`*): `void`

*Inherited from DeprecatedLifecycle.componentWillReceiveProps*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:489*

Called when the component may be receiving new props. React may call this even if props have not changed, so be sure to compare new and existing props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
*__deprecated__*: 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

**Parameters:**

| Param | Type |
| ------ | ------ |
| nextProps | `Readonly`<`any`> |
| nextContext | `any` |

**Returns:** `void`

___
<a id="componentwillunmount"></a>

### `<Static>``<Optional>` componentWillUnmount

▸ **componentWillUnmount**(): `void`

*Inherited from ComponentLifecycle.componentWillUnmount*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:408*

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

**Returns:** `void`

___
<a id="componentwillupdate"></a>

### `<Static>``<Optional>` componentWillUpdate

▸ **componentWillUpdate**(nextProps: *`Readonly`<`any`>*, nextState: *`Readonly`<`any`>*, nextContext: *`any`*): `void`

*Inherited from DeprecatedLifecycle.componentWillUpdate*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:519*

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps prevents this from being invoked.
*__deprecated__*: 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)

*__see__*: [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

**Parameters:**

| Param | Type |
| ------ | ------ |
| nextProps | `Readonly`<`any`> |
| nextState | `Readonly`<`any`> |
| nextContext | `any` |

**Returns:** `void`

___
<a id="getsnapshotbeforeupdate"></a>

### `<Static>``<Optional>` getSnapshotBeforeUpdate

▸ **getSnapshotBeforeUpdate**(prevProps: *`Readonly`<`any`>*, prevState: *`Readonly`<`any`>*):  `SS` &#124; `null`

*Inherited from NewLifecycle.getSnapshotBeforeUpdate*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:439*

Runs before React applies the result of `render` to the document, and returns an object to be given to componentDidUpdate. Useful for saving things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated lifecycle events from running.

**Parameters:**

| Param | Type |
| ------ | ------ |
| prevProps | `Readonly`<`any`> |
| prevState | `Readonly`<`any`> |

**Returns:**  `SS` &#124; `null`

___
<a id="shouldcomponentupdate"></a>

### `<Static>``<Optional>` shouldComponentUpdate

▸ **shouldComponentUpdate**(nextProps: *`Readonly`<`any`>*, nextState: *`Readonly`<`any`>*, nextContext: *`any`*): `boolean`

*Inherited from ComponentLifecycle.shouldComponentUpdate*

*Defined in /Users/hrgui/projects/mobx-form-model/node_modules/@types/react/index.d.ts:403*

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true. `PureComponent` implements a shallow comparison on props and state and returns true if any props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate` and `componentDidUpdate` will not be called.

**Parameters:**

| Param | Type |
| ------ | ------ |
| nextProps | `Readonly`<`any`> |
| nextState | `Readonly`<`any`> |
| nextContext | `any` |

**Returns:** `boolean`

___

