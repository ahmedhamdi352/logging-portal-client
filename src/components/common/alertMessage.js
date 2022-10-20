import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const AlertMessage = (props) => {
  const { message, type } = props;
  return <Alert {...props} style={{ fontWeight: 500 }} message={message || 'Somtthing went wrong!'} type={type || 'error'} showIcon />;
};

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};
export default AlertMessage;
