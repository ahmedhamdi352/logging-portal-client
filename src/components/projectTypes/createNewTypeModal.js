import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import CreateTypeForm from './createTypeForm';
import moment from 'moment';
// import bookActions from '../../redux/book/actions';

const CreateTypeModal = ({ visible, handleCancel, editable }) => {
  const dispatch = useDispatch()

  const [defaultValues, setDefaultValues] = useState(null)

  useEffect(() => {
    if (editable) {
      setDefaultValues(editable)
    }
  }, [editable]);

  return (
    <Modal maskClosable={false} centered title={`Create New Project Type`} visible={visible} onCancel={handleCancel} footer={null}>
      <CreateTypeForm defaultValues={defaultValues} handleCancel={handleCancel} />
    </Modal>
  );
};

export default CreateTypeModal;
