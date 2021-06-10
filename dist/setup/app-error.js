"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, statusCode, messages) {
        var _this = _super.call(this, message) || this;
        _this._message = message;
        if (messages) {
            _this._messages = message;
        }
        _this.status_code = statusCode;
        return _this;
    }
    Object.defineProperty(AppError.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppError.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        enumerable: false,
        configurable: true
    });
    AppError.prototype.format = function (meta) {
        var response = { status_code: this.status_code, message: this.message, messages: this.messages, };
        // @ts-ignore
        if (meta.messages) {
            response.messages = this.messages;
        }
        return response;
    };
    return AppError;
}(Error));
exports.default = AppError;
