import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import roleActions from '../../redux/role/actions';
import Loader from '../../components/utility/loader';
import NewOtpForm from '../../components/setting/newOtpForm';

const { getRoles } = roleActions;
const UserModal = ({ visible, handleCancel }) => {

  return (
    <Modal title="Send New OTP" visible={visible} onCancel={handleCancel} footer={null}>
      <NewOtpForm handleCancel={handleCancel} />
    </Modal>
  );
};

export default UserModal;
