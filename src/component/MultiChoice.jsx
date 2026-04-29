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

const MultiChoice = ({ change, error, data }) => {
  const answers = Array.isArray(data.answer) ? data.answer : [];

  return (
    <QOptionsGrid>
      {OPTIONS.map((opt) => {
        const fieldName = `option${opt}`;
        return (
          <QOptionRow key={opt}>
            <QOptionLabelRow>
              <QOptionControl
                type="checkbox"
                id={`mc-${opt}`}
                name="answer"
                value={opt}
                checked={answers.includes(opt)}
                onChange={change}
              />
              <QOptionLabel htmlFor={`mc-${opt}`}>Option {opt}</QOptionLabel>
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

export default MultiChoice;
