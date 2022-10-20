import React, { useState } from 'react';
import { Button } from 'antd';
import MUIDataTable from 'mui-datatables';
import { isEmpty } from '../../../helpers/utility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const DocumentsTable = ({ docs }) => {

  const columns = [
    {
      name: 'day',
      label: 'Day',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: false,
        sort: false,
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
  ];

  const options = {
    filter: false,
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
    </>
  );
};

export default DocumentsTable;
