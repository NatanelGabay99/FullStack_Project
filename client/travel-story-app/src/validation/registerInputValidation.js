import joi from 'joi';

const registerValidation = (user) => {
    const registerSchema = joi.object({
        fullName: joi.string().min(3).max(30)
        .ruleset.regex(/^([A-Z][a-z]+(?: [A-Z][a-z]+)*)$/)
        .rule({ message: 'Full name must be 3-30 chars long and start with an uppercase letter in first and last name' })
        .required(),
        
        email: joi.string()
      .ruleset.regex(
        /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'email must be a valid email address' })
      .required(),
    password: joi.string()
      .ruleset.regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/

      )
      .rule({
        message:
          'The password must be at least 6 characters long and must contain letters and numbers.',
      })
      .required(),
    });
    return registerSchema.validate(user);
};

export default registerValidation;
