import React from 'react'
import { CheckBox, ErrorMessage, FormInput, FormLabel, LabelContainer } from '../styles/form_style'
import { QuestionFieldContainer } from '../styles/question_style'

const SingleChoice = ({ change, error, data }) => {
  return (
    <>
      <QuestionFieldContainer>
        <LabelContainer>
      <CheckBox type="checkbox" 
               name="correctOptions" 
               value="A" 
               onChange={""}></CheckBox>  
        <FormLabel>Option A</FormLabel>
        </LabelContainer>
        <FormInput
          name='optionA'
          placeholder='Enter option A'
          type='text'
          value={data.optionA}
          onChange={change}
        />
        {error.optionA && <ErrorMessage>{error.optionA}</ErrorMessage>}
      </QuestionFieldContainer>

      <QuestionFieldContainer>
        <LabelContainer>
       <CheckBox type="checkbox" 
               name="correctOptions" value="B" onChange={""}></CheckBox>  
        <FormLabel>Option B</FormLabel>
        </LabelContainer>
        <FormInput
          name='optionB'
          placeholder='Enter option B'
          type='text'
          value={data.optionB}
          onChange={change}
        />
        {error.optionB && <ErrorMessage>{error.optionB}</ErrorMessage>}
      </QuestionFieldContainer>

      <QuestionFieldContainer>
        <LabelContainer>
        <CheckBox type="checkbox" 
               name="correctOptions" value="C" onChange={""}></CheckBox>
        <FormLabel>Option C</FormLabel>
        </LabelContainer>
        <FormInput
          name='optionC'
          placeholder='Enter option C'
          type='text'
          value={data.optionC}
          onChange={change}
        />
        {error.optionC && <ErrorMessage>{error.optionC}</ErrorMessage>}
      </QuestionFieldContainer>

      <QuestionFieldContainer>
        <LabelContainer>
        <CheckBox type="checkbox" 
               name="correctOptions" value="D" onChange={""}></CheckBox>
        <FormLabel>Option D</FormLabel>
        </LabelContainer>
        <FormInput
          name='optionD'
          placeholder='Enter option D'
          type='text'
          value={data.optionD}
          onChange={change}
        />
        {error.optionD && <ErrorMessage>{error.optionD}</ErrorMessage>}
      </QuestionFieldContainer>
    </>
  )
}

export default SingleChoice
