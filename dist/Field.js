var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ModelFormContext } from './ModelForm';
import * as React from 'react';
import { Observer, observer } from 'mobx-react';
import { getIn, isFunction, isString } from './utils';
import filterReactProps from 'filter-react-props';
import { toJS, isObservable } from 'mobx';
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function () {
        var _this = this;
        return (React.createElement(ModelFormContext.Consumer, null, function (model) {
            if (!model) {
                return null;
            }
            return (React.createElement(Observer, null, function () {
                var _a = _this.props, type = _a.type, name = _a.name, value = _a.value, _b = _a.component, component = _b === void 0 ? 'input' : _b, render = _a.render;
                var modelValue = getIn(model.values, name);
                var v = (type === 'radio' || type === 'checkbox'
                    ? value
                    : modelValue) || '';
                var defaultProps = {
                    defaultValue: v,
                    // why OR '' so we dont get uncontrolled error
                    value: v,
                    onChange: model.handleChange,
                    onBlur: model.handleBlur
                };
                if (type === 'radio') {
                    defaultProps.checked = modelValue === _this.props.value;
                }
                var props = __assign({}, defaultProps, _this.props);
                if (isObservable(props.value) && !_this.props.bindValueToMobx) {
                    props.value = toJS(props.value);
                }
                if (isFunction(render)) {
                    return render(props);
                }
                var finalProps = isString(component)
                    ? filterReactProps(props)
                    : props;
                if (!isString(component)) {
                    delete finalProps.component;
                }
                return React.createElement(component, __assign({}, finalProps));
            }));
        }));
    };
    Field = __decorate([
        observer
    ], Field);
    return Field;
}(React.Component));
export default Field;
//# sourceMappingURL=Field.js.map