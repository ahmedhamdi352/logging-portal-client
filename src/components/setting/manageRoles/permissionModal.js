import React from 'react';
import { Modal, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const PermissionModal = ({ visible, handleCancel, permissionsList, rolePermissions }) => {
  const defaultValue = rolePermissions ? rolePermissions.map((p) => p.internalId) : [];
  return (
    <Modal width={300} title="Permissions" visible={visible} onCancel={handleCancel} footer={null}>
      <CheckboxGroup style={{ display: 'inline-grid' }} options={permissionsList} value={defaultValue} />
    </Modal>
  );
};

export default PermissionModal;
