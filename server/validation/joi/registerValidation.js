const Joi = require('joi');

const registerValidation = (user) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(30)
        .regex(/^([A-Z][a-z]+(?: [A-Z][a-z]+)*)$/)
        .required(),
        
        email: Joi.string()
      .ruleset.regex(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'email must be a valid email address' })
      .required(),
    password: Joi.string()
      .ruleset.regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/

      )
      .rule({
        message:
          'The password must be at least 6 characters long and may contain only letters and numbers.',
      })
      .required(),
    });
    return schema.validate(user);
};

module.exports = registerValidation;
