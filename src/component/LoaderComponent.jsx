const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.45)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};
import React from 'react'

const LoaderComponent = ({text,content}) => {
  return (
   
 <div style={overlayStyle}>
          <div
            className="spinner-border text-light"
            role="status"
            style={{ width: '3rem', height: '3rem' }}
          >
            <span className="visually-hidden">{text}</span>
          </div>
          <p style={{ color: '#fff', marginTop: '12px', fontSize: '14px' }}>
          {content}
          </p>
        </div>
  )
}

export default LoaderComponent

