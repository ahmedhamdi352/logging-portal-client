import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import roleActions from '../../../redux/role/actions';
import Loader from '../../../components/utility/loader';
import EditUserForm from '../../../components/setting/userManagment/editUserForm';

const { getRoles } = roleActions;
const UserModal = ({ visible, handleCancel, editable }) => {
  const [defaultValues, setDefaultValues] = useState(null);
  useEffect(() => {
    if (editable) {
      const {
        firstName,
        lastName,
        email,
        isActive,
        role: { internalId },
      } = editable;
      setDefaultValues({ firstName, lastName, email, isActive, role: internalId });
    }
  }, [editable]);

  const [isLoading, setIsLoading] = useState(true);
  const rolesInStore = useSelector(({ role: { roles } }) => roles);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    dispatch(getRoles());
  }, []);
  useEffect(() => {
    if (rolesInStore) {
      const roles = rolesInStore.map((r) => ({ id: r.internalId, value: r.name }));
      setRoles(roles);
    }
    setIsLoading(false);
  }, [rolesInStore]);
  const dispatch = useDispatch();

  return (
    <Modal title={`Edit ${editable?.username}`} visible={visible} onCancel={handleCancel} footer={null}>
      {isLoading ? (
        <div className="m-5">
          <Loader />
        </div>
      ) : (
        <EditUserForm roles={roles} userId={editable?.internalId} defaultValues={defaultValues} />
      )}
    </Modal>
  );
};

export default UserModal;
