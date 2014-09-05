"use strict";
function InternalServerError(code, error) {
    Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "InternalServerError";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = typeof code === "undefined" ? "404" : code;
    this.status = 404;
    this.inner = error;
}

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;

module.exports = InternalServerError;