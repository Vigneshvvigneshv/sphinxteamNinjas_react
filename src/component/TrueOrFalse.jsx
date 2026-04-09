import React from 'react'
import { ErrorMessage, FormInput, FormLabel } from '../styles/form_style'
import { QuestionFieldContainer } from '../styles/question_style'

const TrueOrFalse = ({ change, error, data }) => {
  return (
    <>
      <QuestionFieldContainer>
        <FormLabel>Option A</FormLabel>
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
        <FormLabel>Option B</FormLabel>
        <FormInput
          name='optionB'
          placeholder='Enter option B'
          type='text'
          value={data.optionB}
          onChange={change}
        />
        {error.optionB && <ErrorMessage>{error.optionB}</ErrorMessage>}
      </QuestionFieldContainer>
    </>
  )
}

export default TrueOrFalse
