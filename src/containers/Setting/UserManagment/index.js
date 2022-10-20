import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Table, Tag, Icon } from 'antd';
import settingActions from '../../../redux/setting/actions';
import { capitalize } from '../../../helpers/utility';
import AddUserModal from './addUserModal';
import UpdateUserModal from './updateUserModal';
const { getAllUsers } = settingActions;

const UserManagement = () => {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);
  const [editable, setEditable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector(({ setting }) => setting.users);
  const openModal = () => {
    setAddUserModalVisible(true);
  };
  const handleCancel = () => {
    setAddUserModalVisible(false);
  };
  const openEditUserModal = (user) => {
    setUpdateUserModalVisible(true);
    setEditable(user);
  };
  const closeEditUserModal = () => {
    setUpdateUserModalVisible(false);
    setEditable(null);
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    if (users) {
      setData(users);
      setIsLoading(false);
    }
  }, [users]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render(value, row) {
        let name = row.firstName + ' ' + row.lastName;
        return name;
      },
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render(value) {
        if (value) {
          return (
            <Tag style={{ fontSize: '16', fontFamily: "'Montserrat', sans-serif" }} color="#108ee9">
              {capitalize(value.name)}
            </Tag>
          );
        }
        return <Tag>None</Tag>;
      },
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render(value) {
        if (value === true) {
          return (
            <Tag style={{ fontSize: '16', fontFamily: "'Montserrat', sans-serif" }} color="green">
              Active
            </Tag>
          );
        }
        return (
          <Tag style={{ fontSize: '16', fontFamily: "'Montserrat', sans-serif" }} color="volcano">
            Not Active
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'internalId',
      key: 'internalId',
      render(value, row) {
        return <Icon style={{ fontSize: '18px', cursor: 'pointer' }} type="edit" theme="twoTone" onClick={() => openEditUserModal(row)} />;
      },
    },
  ];
  return (
    <div className="row">
      <div className="col-lg-12">
        <span className="setting-label">User Management</span>
        <Divider className="mt-0 mb-0" />
        <div className="col-12 mb-4 mt-2">
          <Table
            title={() => (
              <div className="f-w-500" style={{ fontSize: '16px' }}>
                <Button type="primary" onClick={() => openModal()}>
                  Add User
                </Button>
              </div>
            )}
            columns={columns}
            dataSource={data}
            loading={isLoading}
            rowKey="internalId"
          />
          <AddUserModal visible={addUserModalVisible} handleCancel={() => handleCancel()} />
          <UpdateUserModal editable={editable} visible={updateUserModalVisible} handleCancel={() => closeEditUserModal()} />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
