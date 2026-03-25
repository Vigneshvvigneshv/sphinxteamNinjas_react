export const validateEmpty=(formData)=>{
     let newErrors = {};

  if (formData.topicName.trim() === "") {
    newErrors.errorMessage = "Topic name is required";
  } 
  return newErrors;
}