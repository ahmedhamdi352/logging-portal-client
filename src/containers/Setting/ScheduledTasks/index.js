import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'antd';
import CronJobSettingForm from './cronJobSettingForm';
import { appPermissions } from '../../../helpers/utility';
import { AlertMessage } from '../../../components/common';
import Loader from '../../../components/utility/loader';
import settingActions from '../../../redux/setting/actions';

const { getSetting } = settingActions;

const ScheduledTasksSetting = () => {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
  const settingData = useSelector(({ setting }) => setting['doc:cronjob']);
  const [setting, setSetting] = useState(null);
  useEffect(() => {
    if (settingData) {
      setSetting(settingData);
      setIsLoading(false);
    }
  }, [settingData]);
  useEffect(() => {
    if (userPermissions[appPermissions.viewSettings]) {
      dispatch(getSetting('doc:cronjob'));
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
    return () => {};
  }, []);
  return (
    <div className="row">
      <div className="col-lg-12">
        <span className="setting-label">Daily Scheduled Tasks</span>

        <Divider className="mt-0 mb-0" />
        {isAuthorized ? (
          <div className="row col-12">{isLoading ? <Loader /> : <CronJobSettingForm defaultSetting={setting} />}</div>
        ) : (
          <AlertMessage className="mt-2 mr-1" message={"Insufficient privileges, you don't have permission to access this feature!"} />
        )}
      </div>
    </div>
  );
};

export default ScheduledTasksSetting;
