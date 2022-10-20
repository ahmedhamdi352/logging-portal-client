import React from 'react';
const InvoiceCompany = ({ type, company, taxActivityCode }) => {
  return (
    <div className="ant-table ant-table-middle ant-table-bordered ant-table-scroll-position-left f-w-500">
      <div className="ant-table-content">
        <div className="ant-table-body">
          <table>
            <thead className="ant-table-thead">
              <tr>
                <th colSpan={2}>
                  <span className="ant-table-header-column">{type} </span>
                </th>
              </tr>
            </thead>

            <tbody className="ant-table-tbody">
              <tr className="ant-table-row ant-table-row-level-0" data-row-key="1">
                <td className="table-list ">Name</td>

                <td className="ml-4 " style={{ lineHeight: 2 }}>
                  {company.name ? company.name : null}
                </td>
              </tr>

              <tr className="ant-table-row ant-table-row-level-0" data-row-key="1">
                <td className="table-list ">ID</td>

                <td className="ml-4 " style={{ lineHeight: 2 }}>
                  {company.taxNumber ? company.taxNumber : null}
                </td>
              </tr>

              <tr className="ant-table-row ant-table-row-level-0" data-row-key="1">
                <td className="table-list ">Type</td>

                <td className="ml-4 " style={{ lineHeight: 2 }}>
                  {company.type ? company.type : null}
                </td>
              </tr>
              {type === 'Issuer' && (
                <tr className="ant-table-row ant-table-row-level-0" data-row-key="1">
                  <td className="table-list ">Tax Activity Code</td>

                  <td className="ml-4 " style={{ lineHeight: 2 }}>
                    {taxActivityCode ? taxActivityCode : null}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCompany;
