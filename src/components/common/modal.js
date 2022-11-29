import React from 'react';
import { Modal } from 'antd';

const GeneralModal = ({ visible, handleCancel, deleteAction, message }) => {

  return (
    <Modal maskClosable={false} title={`Warring`} visible={visible} onCancel={handleCancel} onOk={deleteAction}>
      <p>{message || 'Are you sure you want to delete this record'}</p>
    </Modal>
  );
};

export default GeneralModal;
