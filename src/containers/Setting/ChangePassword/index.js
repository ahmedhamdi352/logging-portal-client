import React from 'react';
import { Divider } from 'antd';
import ChangePasswordForm from '../../../components/setting/changePassword/form';

const ChangePassword = () => {
  return (
    <>
      <span className="setting-label">Change Password</span>
      <Divider className="mt-0 mb-0" />
      <ChangePasswordForm />
    </>
  );
};

export default ChangePassword;
