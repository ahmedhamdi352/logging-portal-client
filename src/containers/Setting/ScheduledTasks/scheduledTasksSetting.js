import React from 'react';
import { Divider } from 'antd';
import CronJobSettingForm from './cronJobSettingForm';

const ScheduledTasksSetting = ({ defaultSetting }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <span
          style={{
            fontWeight: 500,
            fontSize: '20px',
            marginLeft: '10px',
            lineHeight: '50px',
            fontFamily: "'Montserrat', sans-serif",
            color: 'rgba(0, 0, 0, 0.65)',
          }}
        >
          Scheduled Tasks Setting
        </span>
        <Divider className="mt-0 mb-0" />

        <div className="row col-12">
          <CronJobSettingForm defaultSetting={defaultSetting} />
        </div>
      </div>
    </div>
  );
};

export default ScheduledTasksSetting;
