import React from 'react'
import { ErrorMessage, FormInput, FormLabel } from '../styles/form_style'
import { QuestionFieldContainer } from '../styles/question_style'

const MultiChoice = ({ change, error, data }) => {
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

      <QuestionFieldContainer>
        <FormLabel>Option C</FormLabel>
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
        <FormLabel>Option D</FormLabel>
        <FormInput
          name='optionD'
          placeholder='Enter option D'
          type='text'
          value={data.optionD}
          onChange={change}
        />
        {error.optionD && <ErrorMessage>{error.optionD}</ErrorMessage>}
      </QuestionFieldContainer>

      <QuestionFieldContainer>
        <FormLabel>Number of answers</FormLabel>
        <FormInput
          name='numAnswers'
          placeholder='Enter the number of answers'
          type='text'
          value={data.numAnswers}
          onChange={change}
        />
        {error.numAnswers && <ErrorMessage>{error.numAnswers}</ErrorMessage>}
      </QuestionFieldContainer>
    </>
  )
}

export default MultiChoice
