import React, { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteModal from '../../common/modal';
import UpdateLogModal from '../../common/updateLog'
import { useDispatch } from 'react-redux';
import typesActions from '../../../redux/project-types/actions'
import moment from 'moment';
import CreateTypeModal from '../createNewTypeModal';

const DocumentsTable = ({ docs }) => {
  const { deleteType } = typesActions
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
    dispatch(deleteType(deletedRecord))
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
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'color',
      label: 'Color',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: value, padding: '10px', width: '100%' }}>

            </div>
          );
        },
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
            Project Types
          </p>
        }
        data={docs}
        columns={columns}
        options={options}
      />
      <DeleteModal visible={deletedAlert} handleCancel={handleCancelDelete} deleteAction={deleteAction} />
      <CreateTypeModal editable={editable} visible={updateLogModalVisible} handleCancel={() => closeEditLogModal()} />
    </>
  );
};

export default DocumentsTable;
