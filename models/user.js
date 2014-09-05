"use strict";

var mongoose = require('mongoose'),
    validator = require("validator"),
    bcrypt = require("bcryptjs"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        index: {
            unique: true
        }
    },

    password: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: false
    }

}, {
    toObject: {
        virtuals: true
    }, toJSON: {
        virtuals: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);

module.exports.schema.path('email').validate(function (value) {
    return validator.isEmail(value);
}, 'Invalid email address');
