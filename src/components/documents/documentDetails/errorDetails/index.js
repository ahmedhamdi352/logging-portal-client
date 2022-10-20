import React, { useState } from 'react';
import { Alert, Icon, Collapse } from 'antd';
const { Panel } = Collapse;

const ErrorMessage = (details) => {
  console.log('details', details);

  let errorCount = 0;
  const errors = JSON.parse(details.errors);
  console.log('errors_', errors);
  let errorsList = [];
  errors.forEach((errorItem) => {
    errorItem.error.innerError.forEach((item) => {
      console.log('item', item);
      errorsList.push(
        <li key={errorCount} className="f-w-500 mb-1">
          {item.errorCode}
          {' - '} {item.error}
          <p>
            <small>{item.propertyPath}</small>
          </p>
        </li>
      );
      errorCount += 1;
    });
  });
  console.log('errors', errors);

  return <ul>{errorsList.map((error, index) => error)}</ul>;
};

const ErrorDetails = ({ error }) => {
  console.log('error', error);

  return (
    <Collapse className="errorDetails" expandIconPosition="right" style={{ backgroundColor: '#fff2f0' }} defaultActiveKey={['1']}>
      <Panel header={<div className="f-w-500">Validation Error</div>} key="1">
        <ErrorMessage errors={error.details} />
      </Panel>
    </Collapse>
  );
};

export default ErrorDetails;
