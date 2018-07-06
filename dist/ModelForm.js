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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from 'mobx-react';
import * as React from 'react';
export var ModelFormContext = React.createContext(null);
var ModelForm = /** @class */ (function (_super) {
    __extends(ModelForm, _super);
    function ModelForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelForm.prototype.render = function () {
        var _a = this.props, children = _a.children, model = _a.model;
        return (React.createElement(ModelFormContext.Provider, { value: model }, children));
    };
    ModelForm = __decorate([
        observer
    ], ModelForm);
    return ModelForm;
}(React.Component));
export default ModelForm;
//# sourceMappingURL=ModelForm.js.map