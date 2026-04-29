import React from 'react';
import {
  QOptionRow,
  QOptionLabelRow,
  QOptionControl,
  QOptionLabel,
  QError,
} from '../styles/question_style_unified';

const TrueOrFalse = ({ change, error, data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {['True', 'False'].map((val) => (
        <QOptionRow key={val}>
          <QOptionLabelRow>
            <QOptionControl
              type="radio"
              id={`tf-${val}`}
              name="answer"
              value={val}
              checked={data.answer === val || data.answer?.includes(val)}
              onChange={change}
            />
            <QOptionLabel htmlFor={`tf-${val}`}>{val}</QOptionLabel>
          </QOptionLabelRow>
          {/* TrueOrFalse has no text inputs — errors are rarely used but kept for safety */}
          {val === 'True'  && error.optionA && <QError>{error.optionA}</QError>}
          {val === 'False' && error.optionB && <QError>{error.optionB}</QError>}
        </QOptionRow>
      ))}
    </div>
  );
};

export default TrueOrFalse;
