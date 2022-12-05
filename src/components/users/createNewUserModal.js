import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CreateUserForm from './createUserForm';

const CreateProjectModal = ({ visible, handleCancel, editable }) => {
  const dispatch = useDispatch()

  const roles = useSelector(({ role }) => role.roles);
  const { mangers } = useSelector(({ Auth }) => Auth);

  const [defaultValues, setDefaultValues] = useState(null)
  const [employeeRole, setEmployeeRole] = useState(null)


  useEffect(() => {
    if (roles !== null) {
      const employeeRole = roles.filter(item => item.name === 'employee')
      if (employeeRole.lentgh !== 0) {
        setEmployeeRole(employeeRole[0]?.internalId)
      }
    }
  }, [roles])

  console.log(editable)
  useEffect(() => {
    if (editable) {
      setDefaultValues({ ...editable, role: editable?.role?.internalId })
    }
  }, [editable]);

  const getRoleOptions = () => {
    return roles?.map(item => {
      return {
        id: item?.internalId,
        value: item?.name
      }
    })
  }

  const getDirectMangerOptions = () => {
    return mangers?.map(item => {
      return {
        id: item?.internalId,
        value: item?.username
      }
    })
  }

  return (
    <Modal width={750} maskClosable={false} centered title={`Create New User`} visible={visible} onCancel={handleCancel} footer={null}>
      <CreateUserForm employeeRole={employeeRole} directMangerOptions={getDirectMangerOptions()} roleOptions={getRoleOptions()} defaultValues={defaultValues} handleCancel={handleCancel} />
    </Modal>
  );
};

export default CreateProjectModal;
