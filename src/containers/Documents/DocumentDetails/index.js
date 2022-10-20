import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Tag, Button } from 'antd';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import InvoicePageWrapper from './singleInvoice.style';
import Loader from '../../../components/utility/loader';
import { statuses, capitalize, formatePrice } from '../../../helpers/utility';
import InvoiceCompany from '../../../components/documents/documentDetails/invoiceCompany';
import InvoiceLines from '../../../components/documents/documentDetails/invoiceLines';
import ErrorDetails from '../../../components/documents/documentDetails/errorDetails';
import docsActions from '../../../redux/documents/actions';
import { appPermissions } from '../../../helpers/utility';
import { AlertMessage } from '../../../components/common';
import './style.css';

const { getDocumentById, flushDocument, submitDocuments } = docsActions;
const DocumentDetails = (props) => {
  const { documentId } = props.match.params;
  const [doc, setDoc] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const { selectedDocument, error } = useSelector(({ documents }) => documents);
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));

  const dispatch = useDispatch();
  useEffect(() => {
    if (userPermissions[appPermissions.viewInvoicesDetails]) {
      dispatch(getDocumentById(documentId));
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
    return () => {
      dispatch(flushDocument());
    };
  }, [dispatch]);
  useEffect(() => {
    if (selectedDocument) {
      setDoc(selectedDocument);
      setIsLoading(false);
    }
    if (error) {
      setErrorMsg(error);
      props.history.push('/404');
      setIsLoading(false);
    }
  }, [selectedDocument, error]);
  const onClickOnSubmit = (issuerId) => {
    dispatch(submitDocuments(issuerId));
  };
  let documentVat = null;
  if (doc && doc.invoiceLines) {
    let totalVat = 0;
    doc.invoiceLines.forEach((lineItem) => {
      lineItem.taxableItems.forEach((taxItem) => {
        totalVat += taxItem.amount;
      });
    });
    documentVat = totalVat;
  }

  let type = '';
  if (!isLoading && doc?.documentType) {
    let docType = doc.documentType.toLowerCase();
    if (docType === 'i') {
      type = 'Invoice';
    } else if (docType === 'c') {
      type = 'Credit Note';
    } else if (docType === 'd') {
      type = 'Debit Note';
    }
  } else {
    type = 'None';
  }
  return (
    <LayoutWrapper>
      {isAuthorized ? (
        <>
          {!!isLoading ? (
            <Loader />
          ) : (
            <Box>
              <InvoicePageWrapper className="InvoicePageWrapper">
                <div className="PageContent">
                  <div className="OrderInfo">
                    <div className="LeftSideContent">
                      <h3 className="Title">
                        <span className="invoice-title">{type} </span>
                        {doc.documentTypeVersion && <span className="invoice-version">v{doc.documentTypeVersion}</span>}

                        {doc.status && (
                          <div className="mt-3">
                            <Tag
                              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 400 }}
                              color={statuses[`${String(doc.status).toLowerCase()}`]}
                            >
                              {capitalize(doc.status)}
                            </Tag>
                          </div>
                        )}
                      </h3>
                      <br />

                      {doc.internalId && (
                        <p>
                          <span className="orderStatusSpan">Internal Id: </span>
                          <span className="orderStatus">{doc.internalId}</span>
                        </p>
                      )}
                      {doc.docInternalId && (
                        <p>
                          <span className="orderStatusSpan">Document Id: </span>
                          <span className="orderStatus">{doc.docInternalId}</span>
                        </p>
                      )}
                      {doc.uuid && (
                        <p>
                          <span className="orderStatusSpan">UUID: </span>
                          <span className="orderStatus">{doc.uuid}</span>
                        </p>
                      )}
                      {doc.submissionUUID && (
                        <p>
                          <span className="orderStatusSpan">Submission: </span>
                          <span className="orderStatus">{doc.submissionUUID}</span>
                        </p>
                      )}
                      {doc.dateTimeIssued && (
                        <p>
                          <span className="orderStatusSpan">Date time issued: </span>
                          <span className="orderStatus">{moment(doc.dateTimeIssued).format('D/M/YYYY, h:mm:ss')}</span>
                        </p>
                      )}
                    </div>

                    <div className="RightSideContent d-inline">
                      <Button target={'_blank'} href={`json/${documentId}`} className="mr-2">
                        Show JSON
                      </Button>
                      {userPermissions[appPermissions.submitInvoices] && (
                        <Button onClick={() => onClickOnSubmit(doc?.issuer?.internalId)}>Submit</Button>
                      )}
                    </div>
                  </div>
                  {doc.error && doc.status === 'rejected' && (
                    <div className="mt-3 mb-4">
                      <ErrorDetails error={doc.error} />
                    </div>
                  )}

                  <div className="row mt-4 mb-4">
                    <div className="col-6">
                      <InvoiceCompany type="Issuer" company={doc.issuer} taxActivityCode={doc.taxpayerActivityCode} />
                    </div>
                    <div className="col-6 float-right">
                      <InvoiceCompany type="Receiver" company={doc.receiver} />
                    </div>
                  </div>
                  <div className="InvoiceTable">
                    <InvoiceLines data={doc.invoiceLines} />
                    <div className="TotalBill">
                      <p>
                        <span className="f-w-500">Total sales </span> :{' '}
                        <span>{`${typeof doc.totalSalesAmount === 'number' ? formatePrice(doc.totalSalesAmount) : null}`}</span>
                      </p>
                      <p>
                        <span className="f-w-500">Value added tax </span> :{' '}
                        <span>{`${typeof documentVat === 'number' ? formatePrice(documentVat) : null}`}</span>
                      </p>

                      <p>
                        <span className="f-w-500">Total Discount </span> :{' '}
                        <span>{`${typeof doc.totalItemsDiscountAmount === 'number' ? formatePrice(doc.totalItemsDiscountAmount) : null}`}</span>
                      </p>
                      <p>
                        <span className="f-w-500">Extra Discount </span> :{' '}
                        <span>{`${typeof doc.extraDiscountAmount === 'number' ? formatePrice(doc.extraDiscountAmount) : null}`}</span>
                      </p>
                      <p>
                        <span className="f-w-500">Total Amount</span> :{' '}
                        <span>{`${typeof doc.totalAmount === 'number' ? formatePrice(doc.totalAmount) : null}`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </InvoicePageWrapper>
            </Box>
          )}
        </>
      ) : (
        <Box>
          <AlertMessage className="mt-2 mr-1" message={"Insufficient privileges, you don't have permission to access this feature!"} />
        </Box>
      )}
    </LayoutWrapper>
  );
};

export default DocumentDetails;
