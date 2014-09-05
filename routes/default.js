"use strict";

var debug = require('debug')('app:routes:default' + process.pid),
    _ = require("lodash"),
    util = require('util'),
    path = require('path'),
    bcrypt = require('bcryptjs'),
    Router = require("express").Router,
    BadRequestError = require(path.join(__dirname, "..", "errors", "BadRequestError.js")),
    InternalServerError = require(path.join(__dirname, "..", "errors", "InternalServerError.js")),
    NotFoundError = require(path.join(__dirname, "..", "errors", "NotFoundError.js")),
    UnauthorizedAccessError = require(path.join(__dirname, "..", "errors", "UnauthorizedAccessError.js")),
    jwt = require("express-jwt");

var authenticate = function (req, res, next) {

    debug("Processing authenticate middleware");

    var username = req.body.username,
        password = req.body.password;

    if (_.isEmpty(username) || _.isEmpty(password)) {
        return next(new UnauthorizedAccessError("401", {
            message: 'Invalid username or password'
        }));
    }

    next(new InternalServerError("500"));

};

module.exports = function () {

    var router = new Router();

    router.route("/verify").get(function (req, res, next) {
        return res.json(200, undefined);
    });

    router.route("/logout").get(function (req, res, next) {
        return res.json(200, undefined);
    });

    router.route("/login").post(authenticate, function (req, res, next) {
        return res.json(200, undefined);
    });

    router.unless = require("express-unless");

    return router;
};

debug("Loaded");
