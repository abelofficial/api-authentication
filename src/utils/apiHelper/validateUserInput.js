import { emailRegExe, passwordRegExe } from "../RegularExpressions";

const validateEmail = (email) => {
  if (!email) throw new Error("Email address is not set.");
  else if (email === "") throw new Error("Email can not be empty.");
  else if (!emailRegExe.test(email))
    throw new Error("The provided email address is not valid.");
  else return true;
};

const validatePassword = (password) => {
  if (!password) throw new Error("Password is not set.");
  else if (password.length < 6)
    throw new Error("Password must be at minimum 6 characters.");
  else if (!passwordRegExe.test(password))
    throw new Error(
      "Password must contain  one letter and one number at minimum."
    );
  else return true;
};

const validateString = (input, inputType, minLength = 1) => {
  if (!input) throw new Error(`${inputType} is not set.`);
  else if (input.length < minLength)
    throw new Error(`${inputType} must be at minimum ${minLength} characters.`);
  else return true;
};

export { validateEmail, validatePassword, validateString };
