import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import docsActions from '../../../redux/documents/actions';
import DocumentsTable from '../../../components/documents/documentsTable';
import { appPermissions } from '../../../helpers/utility';
import { AlertMessage } from '../../../components/common';
const { getDocuments, flushDocument } = docsActions;

const { Content } = Layout;

const AllDocuments = () => {
  const dispatch = useDispatch();
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
  const documents = useSelector(({ documents }) => documents.documents);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (userPermissions[appPermissions.viewInvoices]) {
      dispatch(getDocuments('active'));
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
    return () => {
      dispatch(flushDocument());
    };
  }, [dispatch]);
  useEffect(() => {
    if (documents) {
      setDocs(documents);
      setIsLoading(false);
    }
  }, [documents]);

  return (
    <LayoutWrapper>
      <Content style={{ padding: '0 20px', marginTop: '-10px' }}>
        {!isAuthorized && <AlertMessage className="mb-2" message={"Insufficient privileges, you don't have permission to access this feature!"} />}
        {isLoading ? (
          <Loader />
        ) : (
          <div
            style={{
              borderRadius: '10px',
              boxShadow: '0 7px 12px 0 rgba(22,37,63,.09)',
              background: '#fff',
              //   padding: 24,
              //   minHeight: 380,
              // minHeight: 400,
            }}
          >
            <DocumentsTable docs={docs} />
          </div>
        )}
      </Content>
    </LayoutWrapper>
  );
};

export default AllDocuments;
