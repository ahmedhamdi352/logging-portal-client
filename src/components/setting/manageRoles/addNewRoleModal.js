import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import RoleForm from './form';

const AddNewRoleModal = ({ permissionsList, visible, handleCancel }) => {
  return (
    <Modal width={900} title="Add New Role" visible={visible} footer={null} onCancel={handleCancel}>
      <RoleForm formType={'add'} permissionsList={permissionsList} defaultValues={{ name: '', permissions: [] }} />
    </Modal>
  );
};

export default AddNewRoleModal;
