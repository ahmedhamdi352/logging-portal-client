import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'antd';
import Loader from '../../../components/utility/loader';
import EmailSettingsForm from '../../../components/setting/emailSettings/form';
import settingActions from '../../../redux/setting/actions';
import { appPermissions } from '../../../helpers/utility';
import { AlertMessage } from '../../../components/common';
const { getSetting } = settingActions;

const EmailSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
  const dispatch = useDispatch();
  const emailSetting = useSelector(({ setting }) => setting['setting:email-config']);
  useEffect(() => {
    if (userPermissions[appPermissions.viewSettings]) {
      dispatch(getSetting('setting:email-config'));
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (emailSetting) {
      setDefaultValues(emailSetting.value);
      setIsLoading(false);
    }
  }, [emailSetting]);
  return (
    <>
      <span className="setting-label">Email Settings</span>
      <Divider className="mt-0 mb-0" />
      {isAuthorized ? (
        <div className="row col-12">{isLoading ? <Loader /> : <EmailSettingsForm defaultValues={defaultValues} />}</div>
      ) : (
        <AlertMessage className="mt-2 mr-1" message={"Insufficient privileges, you don't have permission to access this feature!"} />
      )}
    </>
  );
};

export default EmailSettings;
