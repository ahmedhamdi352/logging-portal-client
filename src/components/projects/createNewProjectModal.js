import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CreateProjectForm from './createProjectForm';

const CreateProjectModal = ({ visible, handleCancel, editable }) => {
  const dispatch = useDispatch()

  const types = useSelector(({ projectTypes }) => projectTypes.projectTypes);


  const [defaultValues, setDefaultValues] = useState(null)

  useEffect(() => {
    if (editable) {
      const type = types?.filter(item => item.name === editable?.type)
      setDefaultValues({ ...editable, type: type[0]?.internalId })
    }
  }, [editable]);

  const getTypeOptions = () => {
    return types?.map(item => {
      return {
        id: item?.internalId,
        value: item?.name
      }
    })
  }

  return (
    <Modal maskClosable={false} centered title={`Create New Project`} visible={visible} onCancel={handleCancel} footer={null}>
      <CreateProjectForm typeOptions={getTypeOptions()} defaultValues={defaultValues} handleCancel={handleCancel} />
    </Modal>
  );
};

export default CreateProjectModal;
