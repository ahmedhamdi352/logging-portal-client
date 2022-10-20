import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import docsActions from '../../../redux/documents/actions';
import DocumentsTable from '../../../components/documents/documentsTable';
import { Layout } from 'antd';

const { getDocuments, flushDocument } = docsActions;

const { Content } = Layout;

const AllDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const documents = useSelector(({ documents }) => documents.documents);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocuments());
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
      <ToastContainer autoClose={4000} hideProgressBar={true} />
    </LayoutWrapper>
  );
};

export default AllDocuments;
