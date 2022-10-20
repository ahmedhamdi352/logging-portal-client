import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import RoleForm from './form';

const EditRoleModal = ({ permissionsList, visible, handleCancel, editableRole, defaultValues }) => {
  return (
    <Modal width={900} title="Edit Role" visible={visible} footer={null} onCancel={handleCancel}>
      <RoleForm
        formType={'edit'}
        permissionsList={permissionsList}
        defaultValues={defaultValues}
        editableRole={editableRole}
        closeModal={handleCancel}
      />
    </Modal>
  );
};

export default EditRoleModal;
