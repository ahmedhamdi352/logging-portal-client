import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Table, Button, Modal, Icon } from 'antd';
import NotificationSubsForm from '../../../components/setting/manageNotificationSubs/form';
import notificationActions from '../../../redux/notification/actions';
import settingActions from '../../../redux/setting/actions';
import Loader from '../../../components/utility/loader';
import { appPermissions } from '../../../helpers/utility';
import { AlertMessage } from '../../../components/common';

const { confirm } = Modal;
const { getSubscribers, deleteSubscriber } = notificationActions;
const { getSetting } = settingActions;

const ManageNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [statusDefaultValue, setStatusDefaultValue] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const dispatch = useDispatch();
  const [userPermissions] = useState(useSelector(({ Auth }) => Auth.user.permissions));
  const subs = useSelector(({ notification }) => notification.notificationSubs);
  const subSettings = useSelector(({ setting }) => setting['setting:email-status']);
  useEffect(() => {
    if (userPermissions[appPermissions.viewSettings]) {
      dispatch(getSubscribers());
      dispatch(getSetting('setting:email-status'));
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (subs && subSettings) {
      setData(subs);
      setStatusDefaultValue(subSettings);
      setIsLoading(false);
    }
  }, [subs, subSettings]);
  function showPromiseConfirm(id) {
    confirm({
      title: 'Do you want to delete this item?',
      icon: <Icon type="circle" />,
      // content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return dispatch(deleteSubscriber(id));
      },
      onCancel() {},
    });
  }
  const columns = [
    {
      title: 'Subscribers',
      dataIndex: 'email',
      align: 'center',
      width: '600px',
      render: (value) => {
        return <div className="fw-500">{value}</div>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'internalId',
      align: 'left',
      render: (value) => {
        return <Button onClick={() => showPromiseConfirm(value)}>Delete</Button>;
      },
    },
  ];
  return (
    <>
      <span className="setting-label">Add Notification Subscribers</span>
      <Divider className="mt-0 mb-0" />
      {isAuthorized ? (
        <div className="row col-12">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="p-0">
                <NotificationSubsForm statusDefaultValue={statusDefaultValue} />
              </div>
              <div className="col-12 p-0">
                <Table columns={columns} dataSource={data} rowKey="internalId" />
              </div>
            </>
          )}
        </div>
      ) : (
        <AlertMessage className="mt-2 mr-1" message={"Insufficient privileges, you don't have permission to access this feature!"} />
      )}
    </>
  );
};

export default ManageNotifications;
