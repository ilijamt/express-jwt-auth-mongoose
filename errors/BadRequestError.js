"use strict";
function BadRequestError(code, error) {
    Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "BadRequestError";
    this.message = typeof error === "undefined" ? {
        message: 'Bad Request'
    } : error.message;
    this.code = typeof code === "undefined" ? "404" : code;
    this.status = 400;
    this.inner = error;
}

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = BadRequestError;

module.exports = BadRequestError;