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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { observable } from 'mobx';
import { isFunction, setNestedObjectValues, setIn, yupToFormErrors, validateYupSchema, getIn } from './utils';
import { set } from 'lodash';
;
var FormViewModel = /** @class */ (function () {
    function FormViewModel(values) {
        /**
         * This is the initial state of the form. This gets copied over to `values` in constructor runtime. On reset, this is used to reset the values to an initial state.
         */
        this.initialValues = {};
        /**
         * These are the values of the form - the current state. Note that unlike formik, the values change automatically instead of waiting on the next render cycle - so there's a huge difference there.
         */
        this.values = __assign({}, this.initialValues);
        /**
         * This is used when any of the fields mentioned are touched; meaning interacted with. By default, `<Field />` uses onBlur for this event.
         */
        this.touched = {};
        /**
         * This is an object that consists of all the errors.
         */
        this.errors = {};
        /**
         * This is true when the form is currently submitting, false otherwise.
         */
        this.isSubmitting = false;
        /**
         * This is to keep track of how many times the user clicked on the submit.
         */
        this.submitCount = 0;
        this.onReset = this.onReset.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setFieldError = this.setFieldError.bind(this);
        this.setFieldTouched = this.setFieldTouched.bind(this);
        this.setValues = this.setValues.bind(this);
        this.setFieldValue = this.setFieldValue.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        if (values) {
            this.values = values;
        }
    }
    Object.defineProperty(FormViewModel.prototype, "isValid", {
        /**
         * Determines if the form is valid.
         */
        get: function () {
            return Object.keys(this.errors).length === 0;
        },
        enumerable: true,
        configurable: true
    });
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
    FormViewModel.prototype.getValueFromInputEvent = function (target) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        var type = target.type, value = target.value, checked = target.checked;
        var isNumericalValue = /number|range/.test(type);
        var isCheckbox = /checkbox/.test(type);
        if (isNumericalValue) {
            var parsed = parseFloat(value);
            return isNaN(parsed) ? '' : parsed;
        }
        if (isCheckbox) {
            return checked;
        }
        return value;
    };
    /**
     * This gets the name to be applied to the values property.
     * By default, it will assume name as the property, but if id is present it will use that too.
     * @param target
     * @param other
     */
    FormViewModel.prototype.getNameFromInputEvent = function (target) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        var name = target.name, id = target.id;
        return name || id;
    };
    /**
     * This method is the default handler for handling change events.
     */
    FormViewModel.prototype.handleChange = function (e) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        var target = e.target || e;
        var fieldName = this.getNameFromInputEvent.apply(this, [target].concat(other));
        var fieldValue = this.getValueFromInputEvent.apply(this, [target].concat(other));
        if (e.persist) {
            e.persist();
        }
        this.setFieldValue(fieldName, fieldValue);
    };
    /**
     * This method is the default handler for handling blur events.
     */
    FormViewModel.prototype.handleBlur = function (e) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        var target = e.target || e;
        var fieldName = this.getNameFromInputEvent.apply(this, [target].concat(other));
        this.setFieldTouched(fieldName, true);
    };
    /**
     * This method sets a field value explicitly.
     * The added benefit is that validations will be run after setFieldValue is called.
     * Note that setFieldValue will automatically do the change immediately; there is no need to wait for another cycle.
     */
    FormViewModel.prototype.setFieldValue = function (name, value) {
        this.setInMobx('values', name, value);
        this.runValidations();
    };
    /**
     * This method sets all field values explicitly.
     * Note that this will cause every form value to re-render, because the entire values object has changed.
     * The added benefit is that validations will be run after setValues is called.
     * Note that setValues will automatically do the change immediately; there is no need to wait for another cycle.
     */
    FormViewModel.prototype.setValues = function (values) {
        this.values = values;
        this.runValidations();
    };
    /**
     * This method sets a single field touched value explicitly.
     * The added benefit is that validations will be run after setFieldTouched is called.
     * Note that setFieldTouched will automatically do the change immediately; there is no need to wait for another cycle.
     */
    FormViewModel.prototype.setFieldTouched = function (name, value) {
        this.setInMobx('touched', name, value);
        this.runValidations();
    };
    /**
     * This method sets a single field error value explicitly.
     * Note that setFieldError will automatically do the change immediately; there is no need to wait for another cycle.
     */
    FormViewModel.prototype.setFieldError = function (name, value) {
        this.setInMobx('errors', name, value);
    };
    /**
     * This method changes all the errors explicilty.
     * Note that setErrors will automatically do all the changes immediately, no need to wait for another cycle.
     */
    FormViewModel.prototype.setErrors = function (errors) {
        this.errors = errors;
    };
    /**
     * Sets the form as currently being submitted or not.
     * @param value
     */
    FormViewModel.prototype.setSubmitting = function (value) {
        this.isSubmitting = value;
    };
    /**
     * This method is the core method for all the validations to run.
     * It returns a boolean: if its true then the form is valid, false otherwise.
     * @param values
     */
    FormViewModel.prototype.runValidations = function (values) {
        if (values === void 0) { values = this.values; }
        return __awaiter(this, void 0, void 0, function () {
            var schemaErrors, validateFnErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validationSchema) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.runValidationSchema(values)];
                    case 1:
                        schemaErrors = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.validate) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.validate(this.values)];
                    case 3:
                        validateFnErrors = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.errors = __assign({}, schemaErrors, validateFnErrors);
                        return [2 /*return*/, Object.keys(this.errors).length === 0];
                }
            });
        });
    };
    /**
     * By default, this resets the form to a pristine state. If this method is overridden, please call `super.onReset()` to get to an initial state.
     */
    FormViewModel.prototype.onReset = function () {
        this.values = __assign({}, this.initialValues);
        this.touched = {};
        this.errors = {};
        this.isSubmitting = false;
        this.submitCount = 0;
    };
    /**
     * This method handles the submit event.
     * @param e
     */
    FormViewModel.prototype.handleSubmit = function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        return this.submitForm();
    };
    /**
     * This method handles the reset event.
     */
    FormViewModel.prototype.handleReset = function () {
        if (this.onReset) {
            this.onReset();
        }
    };
    /**
     * This method handles the cancel event.
     */
    FormViewModel.prototype.handleCancel = function () {
        if (this.onCancel) {
            this.onCancel();
        }
    };
    /**
     * This method is the main submitForm handler when the submit event is invoked.
     * 1. We set all form values as touched
     * 2. We set isSubmitting = true then set it to false afterward.
     */
    FormViewModel.prototype.submitForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.touched = setNestedObjectValues(this.values, true);
                        this.isSubmitting = true;
                        this.submitCount = this.submitCount + 1;
                        return [4 /*yield*/, this.runValidations()];
                    case 1:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw this.errors;
                        }
                        return [4 /*yield*/, this.onSubmit(this.values)];
                    case 2:
                        response = _a.sent();
                        if (!this.onSubmitSuccess) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.onSubmitSuccess(response)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.isSubmitting = false;
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.isSubmitting = false;
                        return [2 /*return*/, this.onSubmitError(e_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * When the user submits but an error occurs, by default it will just throw a console.error.
     * @param e
     */
    FormViewModel.prototype.onSubmitError = function (e) {
        console.error('Error when submitting form', e);
    };
    /**
     * This runs the validation schema and translates it to a more readable form that mobx-form-model can present.
     * @param values
     */
    FormViewModel.prototype.runValidationSchema = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, err_1, errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = isFunction(this.validationSchema)
                            ? this.validationSchema()
                            : this.validationSchema;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validateYupSchema(values, schema)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {}];
                    case 3:
                        err_1 = _a.sent();
                        errors = yupToFormErrors(err_1);
                        return [2 /*return*/, errors];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method sets a value in any object here w/ mobx. It uses set if the value is defined, it overwrites the entire thing
     * otherwise.
     * @param prop
     * @param name
     * @param value
     */
    FormViewModel.prototype.setInMobx = function (prop, name, value) {
        var lastValue = getIn(this[prop], name);
        if (lastValue === undefined) {
            this[prop] = setIn(this[prop], name, value);
            return;
        }
        return set(this[prop], name, value);
    };
    __decorate([
        observable
    ], FormViewModel.prototype, "values", void 0);
    __decorate([
        observable
    ], FormViewModel.prototype, "touched", void 0);
    __decorate([
        observable
    ], FormViewModel.prototype, "errors", void 0);
    __decorate([
        observable
    ], FormViewModel.prototype, "isSubmitting", void 0);
    __decorate([
        observable
    ], FormViewModel.prototype, "submitCount", void 0);
    return FormViewModel;
}());
export default FormViewModel;
//# sourceMappingURL=FormViewModel.js.map