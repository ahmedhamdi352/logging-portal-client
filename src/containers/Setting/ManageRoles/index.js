import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Table, Button, Modal, Icon } from 'antd';
import PermissionModal from '../../../components/setting/manageRoles/permissionModal';
import AddNewRoleModal from '../../../components/setting/manageRoles/addNewRoleModal';
import EditRoleModal from '../../../components/setting/manageRoles/editRoleModal';
import roleActions from '../../../redux/role/actions';
import Loader from '../../../components/utility/loader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { capitalize } from '../../../helpers/utility';
import { appPermissions } from '../../../helpers/utility';
import { AlertMessage } from '../../../components/common';

const { confirm } = Modal;
const { getRoles, getPermissions, deleteRole } = roleActions;

const ManageNotifications = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [rolePermissionsList, setRolePermissionsList] = useState(null);
  const [newRoleModalVisible, setNewRoleModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableRole, setEditableRole] = useState(null);
  const [editableRoleDefaultValues, setEditableRoleDefaultValues] = useState({});
  const [rolesList, setRolesList] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);
  const dispatch = useDispatch();
  const roles = useSelector(({ role }) => role.roles);
  const permissions = useSelector(({ role }) => role.permissions);
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));

  useEffect(() => {
    if (userPermissions[appPermissions.manageRoles]) {
      dispatch(getRoles());
      dispatch(getPermissions());
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (roles && permissions) {
      setRolesList(roles);
      const options = permissions.map((p) => ({ label: capitalize(p.name.replace(/_/g, ' ')), value: p.internalId }));
      setPermissionsList(options);
      setIsLoading(false);
    }
  }, [roles, permissions]);
  const handleViewClick = (permissions) => {
    setRolePermissionsList(permissions);
    setPermissionModalVisible(true);
  };

  const handleCancelPermissionModal = () => {
    setPermissionModalVisible(false);
    setRolePermissionsList(null);
  };

  const handleEditRoleClick = (role) => {
    setEditableRole(role);
    setEditModalVisible(true);
    const rolePermissionsIds = role?.permissions.map((p) => p.internalId) || [];
    setEditableRoleDefaultValues({ name: role?.name, permissions: rolePermissionsIds });
  };
  const handleCancelEditRole = () => {
    setEditableRole(null);
    setEditModalVisible(false);
    setEditableRoleDefaultValues({});
  };

  function showPromiseConfirm(id) {
    confirm({
      title: 'Do you want to delete this item?',
      icon: <Icon type="circle" />,
      // content: '',
      onOk() {
        return dispatch(deleteRole(id));
      },
      onCancel() {},
    });
  }
  const columns = [
    {
      title: 'Role',
      dataIndex: 'name',
      align: 'center',
      width: '500px',
      render: (value) => {
        return <div className="fw-500">{value}</div>;
      },
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      align: 'left',
      render: (value) => {
        return <Button onClick={() => handleViewClick(value)}>VIEW</Button>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'internalId',
      align: 'left',
      render: (value, role) => {
        if (role.default) return null;
        return (
          <>
            <IconButton aria-label="edit" onClick={() => handleEditRoleClick(role)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => showPromiseConfirm(value)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  ];
  return (
    <>
      <span className="setting-label">Manage Roles</span>
      <Divider className="mt-0 mb-2" />
      {isAuthorized ? (
        <div className="row col-12">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="p-0">
                <Button type="primary" className="mb-2" onClick={() => setNewRoleModalVisible(true)}>
                  Add New Role
                </Button>
              </div>
              <div className="col-12 p-1">
                <Table columns={columns} dataSource={rolesList} rowKey="internalId" />
              </div>
            </>
          )}
        </div>
      ) : (
        <AlertMessage className="mt-2 mr-1" message={"Insufficient privileges, you don't have permission to access this feature!"} />
      )}

      <PermissionModal
        permissionsList={permissionsList}
        rolePermissions={rolePermissionsList}
        visible={permissionModalVisible}
        handleCancel={handleCancelPermissionModal}
      />
      <AddNewRoleModal permissionsList={permissionsList} visible={newRoleModalVisible} handleCancel={() => setNewRoleModalVisible(false)} />
      <EditRoleModal
        permissionsList={permissionsList}
        defaultValues={editableRoleDefaultValues}
        editableRole={editableRole}
        visible={editModalVisible}
        handleCancel={handleCancelEditRole}
      />
    </>
  );
};

export default ManageNotifications;
