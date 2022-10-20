import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactJson from 'react-json-view';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import Loader from '../../../components/utility/loader';
import { appPermissions } from '../../../helpers/utility';
import { AlertMessage } from '../../../components/common';
import documentsActions from '../../../redux/documents/actions';
import XMLViewer from 'react-xml-viewer'

const { getDocumentJson } = documentsActions;
const DocumentDetailsJSON = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [data, setData] = useState(null);
  const { selectedDocumentJson, error } = useSelector(({ documents }) => documents);
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
  const { documentId } = props.match.params;
  if (!documentId) {
    props.history.push('/404');
  }
  useEffect(() => {
    if (userPermissions[appPermissions.viewInvoicesDetails]) {
      dispatch(getDocumentJson(documentId));
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    setIsLoading(false);
    if (selectedDocumentJson) {
      setData(selectedDocumentJson);
    }
  }, [selectedDocumentJson]);

  return (
    <LayoutWrapper>
      <LayoutContent style={{ padding: '0', marginTop: '-10px', height: 'auto', minHeight: '80vh' }}>
        {isAuthorized ? (
          <>{!!isLoading || data === null ? <Loader /> : <XMLViewer xml={data} />}</>
        ) : (
          <AlertMessage className="m-2" message={"Insufficient privileges, you don't have permission to access this feature!"} />
        )}
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default DocumentDetailsJSON;
