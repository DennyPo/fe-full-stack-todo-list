import { ajv, errorMessages, createErrors, emailPattern, passwordPattern, namePattern } from "./index";


const validationSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      minLength: 1,
      pattern: emailPattern,
      errorMessage: {
        pattern: errorMessages.notValidEmail
      }
    },
    name: {
      type: "string",
      minLength: 1,
      pattern: namePattern,
      errorMessage: {
        pattern: "Name is too short"
      }
    },
    password: {
      type: "string",
      minLength: 1,
      pattern: passwordPattern,
      errorMessage: {
        pattern: errorMessages.minLengthPassword
      }
    }
  },
  errorMessage: {
    properties: {
      email: errorMessages.emptyEmail,
      name: "Please, enter your name",
      password: errorMessages.emptyPassword,
    }
  }
};

export const validate = createErrors(ajv.compile(validationSchema));
