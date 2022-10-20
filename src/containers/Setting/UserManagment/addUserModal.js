import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import roleActions from '../../../redux/role/actions';
import Loader from '../../../components/utility/loader';
import AddUserForm from '../../../components/setting/userManagment/addUserForm';

const { getRoles } = roleActions;
const UserModal = ({ visible, handleCancel }) => {
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
    <Modal title="Add new user" visible={visible} onCancel={handleCancel} footer={null}>
      {isLoading ? (
        <div className="m-5">
          <Loader />
        </div>
      ) : (
        <AddUserForm roles={roles} />
      )}
    </Modal>
  );
};

export default UserModal;
