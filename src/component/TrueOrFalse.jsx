import React from 'react'
import { ErrorMessage, FormInput, FormLabel, LabelContainer } from '../styles/form_style'
import { QuestionFieldContainer } from '../styles/question_style'

const TrueOrFalse = ({ change, error, data }) => {
  return (
    <>
      <QuestionFieldContainer>
        <LabelContainer>
           <CheckBox type="radio" 
                         name="answer"
                          value="True" 
                          checked={data.answer?.includes("True")}
                          onChange={change}></CheckBox>
        <FormLabel>True</FormLabel>
        </LabelContainer>
        {error.optionA && <ErrorMessage>{error.optionA}</ErrorMessage>}
      </QuestionFieldContainer>

      <QuestionFieldContainer>
        <LabelContainer>
           <CheckBox type="radio"
                        name="answer"
                        value="False" 
                        checked={data.answer?.includes("False")}
                        onChange={change}></CheckBox>
        <FormLabel>False</FormLabel>
        </LabelContainer>
       
        {error.optionB && <ErrorMessage>{error.optionB}</ErrorMessage>}
      </QuestionFieldContainer>
    </>
  )
}

export default TrueOrFalse
