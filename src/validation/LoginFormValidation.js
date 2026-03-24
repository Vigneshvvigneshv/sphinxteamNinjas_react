

export const validate = (formData) => {
  let newErrors = {};

  if (formData.userName.trim() === "") {
    newErrors.userName = "Username is required";
  } 


  if (formData.password.trim() === "") {
    newErrors.password = "Password is required";
  } 

  return newErrors;
};