import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import docsActions from '../../../redux/documents/actions';
import toaster from '../../../redux/toaster/actions';

import DocumentsTable from '../../../components/documents/documentsTable';
import { Layout } from 'antd';
import readXlsxFile from 'read-excel-file'
import { drop } from 'lodash'
import moment from 'moment';

const { getDocuments, flushDocument, submitslogs } = docsActions;

const { Content } = Layout;

const AllDocuments = () => {
  const [docs, setDocs] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const documents = useSelector(({ documents }) => documents.documents);
  const loading = useSelector(({ documents }) => documents.loading);
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
    }
  }, [documents]);

  return (
    <LayoutWrapper>
      <Content style={{ padding: '0 20px', marginTop: '-10px' }}>
        {loading ? (
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
                if (e.target.files[0]?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                  readXlsxFile(e.target.files[0]).then((rows) => {
                    if (rows[0]?.includes('Days') && rows[0]?.includes('Date') && rows[0]?.includes('Knowledge Sharing') && rows[0]?.includes('Team Meetings')
                      && rows[0]?.includes('Daily Standup') && rows[0]?.includes('Collaboration') && rows[0]?.includes('Learning') && rows[0]?.includes('Breaking')
                      && rows[0]?.includes('Planned') && rows[0]?.includes('Internal Support') && rows[0]?.includes('External Support') && rows[0]?.includes('Support')
                      && rows[0]?.includes('vacation') && rows[0]?.includes('Manhour')) {
                      rows = drop(rows)
                      const res = rows.map((item => {
                        return {
                          'day': item[0],
                          'date': moment(item[1]),
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
                      const check = []
                      res.map(item => {
                        if (docs.length !== 0) {
                          docs.map(d => {
                            if (d.date === item.date) {
                              check.push(item)
                            }
                          })
                        }
                      })
                      if (check.length === 0) {
                        dispatch(submitslogs(res))
                      }
                      else dispatch(toaster.triggerError(`You already have a log on date ${check[0]?.date}`));
                    }
                    else dispatch(toaster.triggerError(`Failed to upload .... wrong file structure `));
                  })
                }
                else dispatch(toaster.triggerError(`Failed to upload .... wrong file type`));
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
