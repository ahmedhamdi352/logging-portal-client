import React, { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteModal from '../../common/modal';
import UpdateLogModal from '../../common/updateLog'
import { useDispatch } from 'react-redux';
import userActions from '../../../redux/auth/actions'
import moment from 'moment';
import CreateTypeModal from '../createNewProjectModal';

const UserTable = ({ docs }) => {
  const { deleteUser } = userActions
  const dispatch = useDispatch();

  const [deletedRecord, setdeletedRecord] = useState(null);
  const [deletedAlert, setDeletedAlert] = useState(false);
  const [editable, setEditable] = useState(null);
  const [updateLogModalVisible, setUpdateLogModalVisible] = useState(false);


  const deleteRecord = (record) => {
    setdeletedRecord(record)
    setDeletedAlert(true)
  }

  const handleCancelDelete = () => {
    setdeletedRecord(null)
    setDeletedAlert(false)
  }

  const deleteAction = () => {
    dispatch(deleteUser(deletedRecord))
    setDeletedAlert(false)
  }

  const openEditLogModal = (id) => {
    const log = docs.filter(item => item.internalId === id)
    setUpdateLogModalVisible(true);
    if (log.length !== 0) {
      setEditable(log[0])
    }
  };

  const closeEditLogModal = () => {
    setUpdateLogModalVisible(false);
    setEditable(null);
  };

  const columns = [
    {
      name: 'internalId',
      label: 'Name',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableData, rowData) => {
          const record = docs.filter(item => item.internalId === value)
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>{`${record[0]?.firstName} ${record[0]?.lastName}`}</p>
            </div>
          );
        },
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'speciality',
      label: 'Speciality',
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: 'internalId',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={() => openEditLogModal(value)} style={{ marginRight: '15px' }}>
                <EditIcon style={{ color: '#1890FF' }} />
              </Button>
              <Button onClick={() => {
                deleteRecord(value)
              }}>
                <DeleteIcon style={{ color: 'red', }} />
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    filterType: 'dropdown',
    search: false,
    download: false,
    print: false,
    responsive: 'vertical',
    fixedSelectColumn: false,
    selectableRowsHeader: true,
    selectableRows: false,
    scrollY: true
  };
  return (
    <>
      <MUIDataTable
        title={
          <p
            className="pt-2"
            style={{
              fontSize: '18px',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Users
          </p>
        }
        data={docs}
        columns={columns}
        options={options}
      />
      <DeleteModal
        message="By deleting this user all related allocations will be deleted"
        visible={deletedAlert} handleCancel={handleCancelDelete} deleteAction={deleteAction} />
      <CreateTypeModal editable={editable} visible={updateLogModalVisible} handleCancel={() => closeEditLogModal()} />
    </>
  );
};

export default UserTable;
