import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import docsActions from '../../../redux/documents/actions';
import DocumentsTable from '../../../components/documents/documentsTable';
import { Layout } from 'antd';
import readXlsxFile from 'read-excel-file'
import { drop } from 'lodash'
import moment from 'moment';

const { getDocuments, flushDocument, submitslogs } = docsActions;

const { Content } = Layout;

const AllDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const documents = useSelector(({ documents }) => documents.documents);
  const { user } = useSelector(({ Auth }) => Auth);
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
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
            <label for="file-upload" class="custom-file-upload" style={{
              padding: '6px 12px',
              color: 'white', backgroundColor: '#2D3446',
              borderRadius: '4px', cursor: 'pointer', border: '1px solid #ccc'
            }}>
              Custom Upload
            </label>
            <input id="file-upload" type="file" style={{ display: 'none' }}
              onChange={(e) => {
                readXlsxFile(e.target.files[0]).then((rows) => {
                  rows = drop(rows)
                  console.log(rows.length)
                  const res = rows.map((item => {
                    return {
                      'day': item[0],
                      'date': moment(item[1]).format('DD-MMM'),
                      'knowledgeSharing': item[2],
                      'teamMeetings': item[3],
                      'dailyStandup': item[4],
                      'collaboration': item[5],
                      'learning': item[6],
                      'planned': item[7],
                      'internalSupport': item[8],
                      'externalSupport': item[9],
                      'support': item[10],
                      'manHour': item[12],
                      'user': { internalId: user?.id },
                    }
                  }))
                  console.log(res)
                  dispatch(submitslogs(res))
                  // `rows` is an array of rows
                  // each row being an array of cells.
                })
              }
              }
            />
            <div
              style={{
                borderRadius: '10px',
                boxShadow: '0 7px 12px 0 rgba(22,37,63,.09)',
                background: '#fff',
                width: '100%'
              }}
            >
              <DocumentsTable docs={docs} />
            </div>
          </div>
        )}
      </Content>
      <ToastContainer autoClose={4000} hideProgressBar={true} />
    </LayoutWrapper>
  );
};

export default AllDocuments;
