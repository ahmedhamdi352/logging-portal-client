import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Divider } from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import LayoutContent from '../../../components/utility/layoutContent';
import AddReceiverForm from '../../../components/company/form';
const { Content } = Layout;

const NewDocument = () => {
  return (
    <LayoutWrapper>
      <LayoutContent className="p-0" style={{ marginTop: '-10px', height: 'auto', minHeight: '80vh' }}>
        <Content className="container">
          <div className="row">
            <span
              className="col-12"
              style={{
                fontWeight: 500,
                fontSize: '20px',
                marginLeft: '10px',
                lineHeight: '50px',
                fontFamily: "'Montserrat', sans-serif",
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
              Add New Document
            </span>
            <Divider className="mt-0 mb-0" />
            <div className="col-12">dummy</div>
            <div className="col-12">dummy</div>
            <div className="col-12">dummy</div>
          </div>
        </Content>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default NewDocument;
