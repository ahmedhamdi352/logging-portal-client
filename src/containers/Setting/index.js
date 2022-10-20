import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Menu } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ScheduledTasksSetting from './ScheduledTasks';
import ChangePassword from './ChangePassword';
import UserManagment from './UserManagment';
import EmailSettings from './EmailSettings';
import ManageNotifications from './ManageNotifications';
import ManageRoles from './ManageRoles';

const Setting = () => {
  const currentUser = useSelector(({ Auth }) => Auth.user);
  let userRole = currentUser.role;
  // const [key, setKey] = useState(userRole === 'admin' ? '1' : '3');
  const [key, setKey] = useState('1');

  const changeTab = (event) => {
    setKey(event.key);
  };
  return (
    <LayoutWrapper>
      <LayoutContent style={{ padding: '0', marginTop: '-10px', height: 'auto', minHeight: '80vh' }}>
        <div className="row">
          <div className="col pl-5">
            <ChangePassword />
          </div>
        </div>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default Setting;
