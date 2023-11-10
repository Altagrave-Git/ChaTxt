class BaseValidator {
  email = (input) => {
    let valid = false;
  
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
      valid = true;
    }
  
    return valid;
  }

  password = (input) => {
    let valid = false;

    if (/^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,255}$/.test(input)) {
      valid = true;
    }

    return valid;
  }
}

const validator = new BaseValidator();

export default validator;