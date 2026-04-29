import React from 'react';
import {
  QOptionRow,
  QOptionLabelRow,
  QOptionControl,
  QOptionLabel,
  QOptionInput,
  QError,
  QOptionsGrid,
} from '../styles/question_style_unified';

const OPTIONS = ['A', 'B', 'C', 'D'];

const SingleChoice = ({ change, error, data }) => {
  return (
    <QOptionsGrid>
      {OPTIONS.map((opt) => {
        const fieldName = `option${opt}`;
        return (
          <QOptionRow key={opt}>
            <QOptionLabelRow>
              <QOptionControl
                type="radio"
                id={`sc-${opt}`}
                name="answer"
                value={opt}
                checked={data.answer === opt || data.answer?.includes(opt)}
                onChange={change}
              />
              <QOptionLabel htmlFor={`sc-${opt}`}>Option {opt}</QOptionLabel>
            </QOptionLabelRow>

            <QOptionInput
              name={fieldName}
              placeholder={`Enter option ${opt}`}
              type="text"
              value={data[fieldName] || ''}
              onChange={change}
              $hasError={!!error[fieldName]}
            />
            {error[fieldName] && <QError>{error[fieldName]}</QError>}
          </QOptionRow>
        );
      })}
    </QOptionsGrid>
  );
};

export default SingleChoice;
