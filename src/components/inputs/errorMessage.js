import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
const FormErrorMessage = ({ errors, name }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'red',
          }}
        >
          {message}
        </p>
      )}
    />
  );
};

export default FormErrorMessage;
