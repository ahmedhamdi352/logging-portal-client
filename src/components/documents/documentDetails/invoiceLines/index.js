import React from 'react';
import { Table } from 'antd';
import { ellipsis } from '../../../../helpers/utility';
const InvoiceLines = ({ data }) => {
  const columns = [
    {
      title: 'Line Id',
      dataIndex: 'internalId',
    },
    {
      title: 'Item Type',
      dataIndex: 'itemType',
    },
    {
      title: 'Item Code',
      dataIndex: 'itemCode',
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '20%',
      render: (v) => {
        return ellipsis(v, 30);
      },
    },
    // {
    //   title: 'Amount EGP',
    //   dataIndex: 'invoiceLine.unitValue.amountEGP',
    // },
    {
      title: 'Net Total',
      dataIndex: 'netTotal',
      render: (value, invoiceLine) => {
        if (typeof value === 'number') {
          return Number(value.toFixed(5));
        } else {
          return '-';
        }
      },
    },
    {
      title: 'Sales Total',
      dataIndex: 'salesTotal',
      render: (value, invoiceLine) => {
        if (typeof value === 'number') {
          return Number(value.toFixed(5));
        } else {
          return '-';
        }
      },
    },
    {
      title: 'Total Tax Amount',
      dataIndex: 'taxableItems',
      render: (taxableItems, invoiceLine) => {
        let totalTax = 0;
        invoiceLine.taxableItems.forEach((item) => {
          totalTax += item.amount;
        });
        return Number(totalTax.toFixed(5));
      },
    },
    {
      title: 'Total Amount',
      dataIndex: 'total',
      render: (value, invoiceLine) => {
        if (typeof value === 'number') {
          return Number(value.toFixed(5));
        } else {
          return '-';
        }
      },
    },
  ];

  return (
    <Table
      rowKey={'internalId'}
      title={() => (
        <div className="f-w-500" style={{ fontSize: '16px' }}>
          Invoice Lines
        </div>
      )}
      id="invoiceLines"
      columns={columns}
      dataSource={data}
      size="middle"
      pagination={false}
    />
  );
};

export default InvoiceLines;
