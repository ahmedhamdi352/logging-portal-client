import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Loader from '../../components/utility/loader';
import userActions from '../../redux/auth/actions';
import roleActions from '../../redux/role/actions';
import UsersTable from '../../components/users/usersTable';
import CreateNewUser from '../../components/users/createNewUserModal'
import { Layout } from 'antd';
import { Button } from 'antd';

const { getRelatedUsers, flushRelatedUsers, getMangers } = userActions;
const { getRoles } = roleActions;

const { Content } = Layout;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const [openCreateModal, setOpenModal] = useState(false)

  const { relatedUsers, loading, user } = useSelector(({ Auth }) => Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRelatedUsers());
    dispatch(getRoles())
    if (user?.role !== 'manger') {
      dispatch(getMangers())
    }
    return () => {
      dispatch(flushRelatedUsers());
    };
  }, [dispatch]);

  useEffect(() => {
    if (relatedUsers) {
      const data = relatedUsers?.filter(item => item?.internalId !== user?.id)
      setUsers(data);
    }
  }, [relatedUsers]);

  return (
    <LayoutWrapper>
      <Content style={{ padding: '0 20px', marginTop: '-10px' }}>
        {loading ? (
          <Loader />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
            <Button for="file-upload" class="custom-file-upload" style={{
              padding: '6px 12px',
              color: 'white', backgroundColor: '#2D3446',
              borderRadius: '4px', border: '1px solid #ccc',
              margin: '5px', textAlign: 'center', marginTop: '0px'
            }}
              onClick={() => setOpenModal(true)}
            >
              Create New user
            </Button>

            <div
              style={{
                borderRadius: '10px',
                boxShadow: '0 7px 12px 0 rgba(22,37,63,.09)',
                background: '#fff',
                width: '100%',
              }}
            >
              <UsersTable docs={users} />
            </div>
          </div>
        )}
      </Content>
      {openCreateModal && <CreateNewUser visible={openCreateModal} handleCancel={() => setOpenModal(false)} />}
      <ToastContainer autoClose={4000} hideProgressBar={true} />
    </LayoutWrapper>
  );
};

export default AllUsers;
