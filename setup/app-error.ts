import {appErrorResponse} from "./app-error.interface";

class AppError extends Error {
    _message: string;
    status_code: string;
    _messages: string | undefined;

    constructor(message: string, statusCode: string, messages?: string) {
        super(message);
        this._message = message;
        if (messages) {
            this._messages = message;
        }
        this.status_code = statusCode;
    }

    get message() {
        return this._message;
    }

    get messages() {
        return this._messages;
    }

    format(meta?: appErrorResponse) {
        let response = {status_code: this.status_code, message: this.message, messages: this.messages,};
        // @ts-ignore
        if (meta.messages) {
            response.messages = this.messages;
        }
        return response;
    }

}

export default AppError;
