

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
    newErrors.passPercentage = "Pass percentage is required";
  } else if (!PERCENTAGE_REGEX.test(formData.passPercentage)) {
    newErrors.passPercentage = "The Pass percentage must be in the range of 20 to 100";
  }

  return newErrors;
};

export const validateExamTopic=(formData)=>{
    let newErrors={};

    if(formData.topic.trim()==="topic"){
      newErrors.topicName="Select the correct topic";
    }

    if(formData.percentage===""){
      newErrors.percentage='percentage is required';
    }else if(!PERCENTAGE_REGEX.test(formData.percentage)){
      newErrors.percentage='The Percentage must be in the range of 20 to 100';
    }

    if(formData.passPercentage===""){
      newErrors.passPercentage='Pass percentage is required';
    }else if(!PERCENTAGE_REGEX.test(formData.passPercentage)){
      newErrors.passPercentage='The Pass percentage must be in the range of 20 to 100';
    }
    return newErrors;
}

export const validateQuestion=(formData)=>{
     let newErrors={};

    if(formData.questionDetail.trim()===""){
      newErrors.questionDetail="Question is required";
    } 
    if(formData.negativeMarkValue===""){
      newErrors.negativeMarkValue='Negative mark is required';
    }

    if(formData.questionTypeId==='MULTI_CHOICE' || formData.questionTypeId==='SINGLE_CHOICE'){
     
      
      if(formData.optionA===""){
        newErrors.optionA='option is required';
      }
      if(formData.optionB===""){
        newErrors.optionB='option is required';
      }
      if(formData.optionC===""){
        newErrors.optionC='option is required';
      }
      if(formData.optionD===""){
        newErrors.optionD='option is required';
      }
      if(formData.questionTypeId==='MULTI_CHOICE'){
        if(formData.numAnswers===""){
          newErrors.numAnswers='option is required';
        }
      }
    }
    if(formData.answer===""){
      newErrors.answer='answer is required';
    }
    if(formData.answerValue===""){
      newErrors.answerValue='Mark is required';
    }
    
  
    return newErrors;
}

export const validateAddTopicExam=(formData)=>{
     let newErrors={};

   

     if(formData.percentage===""){
       newErrors.percentage="percentage is required";
     }else if(!PERCENTAGE_REGEX.test(formData.percentage)){
       newErrors.percentage='The Percentage must be in the range of 20 to 100';
     }
  
     if(formData.topicPassPercentage===""){
       newErrors.topicPassPercentage='Pass percentage is required';
     }else if(!PERCENTAGE_REGEX.test(formData.topicPassPercentage)){
       newErrors.topicPassPercentage='The Pass percentage must be in the range of 20 to 100';
     }
   
   

    return newErrors;
}


