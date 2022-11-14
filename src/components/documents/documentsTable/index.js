import React, { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteModal from '../../common/modal';
import UpdateLogModal from '../../common/updateLog'
import { useDispatch } from 'react-redux';
import LogsActions from '../../../redux/documents/actions'
import moment from 'moment';

const DocumentsTable = ({ docs }) => {
  const { deletLog, setEditRecord } = LogsActions
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
    dispatch(deletLog(deletedRecord))
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
      name: 'day',
      label: 'Day',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
        display: true,
        customFilterListOptions: {
          render: v => `Month: ${v}`,
          update: (filterList, filterPos, index) => {
            console.log('update');
            console.log(filterList, filterPos, index);
            return filterList;
          }
        },
        filterOptions: {
          names: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          logic: (data, filters) => {
            if (filters.length) return !filters.includes(moment(data).format('MMM'));
            return false;

          },
        },
        customBodyRender: (value) => {
          return (
            <div>
              {moment(value).format('DD-MMM')}
            </div>
          )
        }
      },
    },
    {
      name: 'collaboration',
      label: 'Collaboration',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'learning',
      label: 'Learning',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'planned',
      label: 'Planned',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'support',
      label: 'Support',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'manHour',
      label: 'Man Hours',
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <Button onClick={() => openEditLogModal(value)}>
                {/* <Link to="/dashboard/log"> */}
                <EditIcon style={{ color: '#1890FF' }} />
                {/* </Link> */}
              </Button>
              <Button onClick={() => {
                deleteRecord(value)
              }}>
                <DeleteIcon style={{ color: 'red' }} />
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
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
            Your Logs
          </p>
        }
        data={docs}
        columns={columns}
        options={options}
      />
      <DeleteModal visible={deletedAlert} handleCancel={handleCancelDelete} deleteAction={deleteAction} />
      <UpdateLogModal editable={editable} visible={updateLogModalVisible} handleCancel={() => closeEditLogModal()} />
    </>
  );
};

export default DocumentsTable;
