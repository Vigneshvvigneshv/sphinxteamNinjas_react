

const NAME_REGEX = /^[A-Za-z][A-Za-z0-9 ]*$/;

const NUMBER_OF_QUESTION_REGEX = /^(?:[1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/;
const DURATION_REGEX=/^(?:[1-9]|[1-9][0-9]|1[0-7][0-9]|180)$/;
const PERCENTAGE_REGEX=/^(?:[2-9]|[2-9][0-9]|100)$/;

export const validateEmpty=(formData)=>{
     let newErrors = {};

  if (formData.topicName.trim() === "") {
    newErrors.errorMessage = "Topic name is required";
  } 
  return newErrors;
}

export const validateExam = (formData) => {
  let newErrors = {};

  if (formData.examName.trim() === "") {
    newErrors.examName = "Exam name is required";
  } else if (!NAME_REGEX.test(formData.examName.trim())) {
    newErrors.examName = "Exam name must start with letter";
  }

  if (formData.description.trim() === "") {
    newErrors.description = "Description is required";
  }

  if (formData.noOfQuestions === "") {
    newErrors.noOfQuestions = "Number of question is required";
  } else if (!NUMBER_OF_QUESTION_REGEX.test(formData.noOfQuestions)) {
    newErrors.noOfQuestions ="The number of questions must be in the range of 1 to 150";
  }

  if (formData.duration === "") {
    newErrors.duration = "Duration is required";
  } else if (!DURATION_REGEX.test(formData.duration)) {
    newErrors.duration = "The duration must be in the range of 1 to 180";
  }
  if (formData.passPercentage === "") {
    newErrors.passPercentage = "Percentage is required";
  } else if (!PERCENTAGE_REGEX.test(formData.passPercentage)) {
    newErrors.passPercentage = "The Percentage must be in the range of 20 to 100";
  }

  return newErrors;
};