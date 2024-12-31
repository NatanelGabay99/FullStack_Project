import joi from 'joi';

const loginValidation = (user) => {
  const loginSchema = joi.object({
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
             'The password must be at least 6 characters long and may contain only letters and numbers.',
         })
         .required(),
  });
  return loginSchema.validate(user);
};

export default loginValidation;