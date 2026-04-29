
const USERNAME_REGEX = /^[a-zA-Z]\S{4,}$/;
const EMAIL_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9-]+\\.[A-Za-z]{2}$/;
const PASSWORD_PATTERN = /^(?=\S{8,}$).*/;

const FIRSTNAME_REGEX=/^[A-Za-z]+$/;
const LASTNAME_REGEX=/^[A-Za-z]+$/;


export const validate = (formData) => {
  let newErrors = {};

  if (formData.userName.trim() === "") {
    newErrors.userName = "User name is required";
  } else if (!USERNAME_REGEX.test(formData.userName.trim())) {
    newErrors.userName = "User name must be at least 5 characters";
  }

  if (formData.firstName.trim() === "") {
    newErrors.firstName = "First name is required";
  } else if (!FIRSTNAME_REGEX.test(formData.firstName.trim())) {
    newErrors.email = "First name must be letters";
  }

  if (formData.lastName.trim() === "") {
    newErrors.lastName = "Last name is required";
  } else if (!LASTNAME_REGEX.test(formData.lastName.trim())) {
    newErrors.lastName = "Last name must be a letters";
  }

  if (formData.email.trim() === "") {
    newErrors.email = "Email is required";
  } 
  // else if (!EMAIL_REGEX.test(formData.email.trim())) {
  //   newErrors.email = "Enter a valid email";
  // }
if(formData.roleTypeId==='SPHINX_ADMIN'){

  if (formData.password.trim() === "") {
    newErrors.password = "Password is required";
  } else if (!PASSWORD_PATTERN.test(formData.password.trim())) {
    newErrors.password =
      "Password must be at least 8 characters";
  }
}

  return newErrors;
};

