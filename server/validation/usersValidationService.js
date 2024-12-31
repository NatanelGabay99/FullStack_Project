const loginValidation = require("./joi/loginValidation");
const registerValidation = require("./joi/registerValidation");


const config = require("config");
const validator = config.get("VALIDATOR");

const validateRegistration = (user) => {
  if (validator === "joi") {
    const { error } = registerValidation(user);
    if (error){
      console.log(error.details[0].message);
      return error.details[0].message;}
    return "";
  }
};

const validateLogin = (user) => {
  if (validator === "joi") {
    const { error } = loginValidation(user);
    if (error) return error.details[0].message;
    return "";
  }
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;