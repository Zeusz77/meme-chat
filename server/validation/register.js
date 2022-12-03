const validator = require('validator');
const isEmpty = require('./is-empty');
const login = require('./login');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

    if(!validator.isLength(data.handle, {min: 2, max: 30})){
        errors.handle = "Name must be between 2 and 30 characters";
    }

    if(validator.isEmpty(data.handle)){
        errors.handle = "Name must NOT be empty";
    }
    
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be at least 6 characters long";
    }

    if(validator.isEmpty(data.passwordConfirm)){
        errors.passwordConfirm = "Confirm Password required";
    }

    if(!validator.equals(data.password, data.passwordConfirm)){
        errors.passwordConfirm = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}