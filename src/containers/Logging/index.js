import React from 'react';
import { Divider } from 'antd';
import LoggingForm from '../../components/logging/loggingForm';

const LoggingShet = () => {
  return (
    <div className="pl-4">
      <span className="setting-label">Log Your Time</span>
      <Divider className="mt-0 mb-0" />
      <LoggingForm />
    </div>
  );
};

export default LoggingShet;
