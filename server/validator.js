const Joi = require('@hapi/joi');

const signupValidator = Joi.object({
    name: Joi.string()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})

const loginValidator = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})


const postValidator = Joi.object({
    title: Joi.string()
        .required(),
    
    body: Joi.string()
        .required(),
    
    photo: Joi.string()
})

module.exports.loginValidator = loginValidator;
module.exports.signupValidator = signupValidator;

module.exports.postValidator = postValidator;