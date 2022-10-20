import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Switch, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import settingActions from '../../../redux/setting/actions';

const { updateCrobJobSettings } = settingActions;

const CronJobSettingForm = ({ defaultSetting }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { ...defaultSetting.value },
  });
  const onSubmit = (values) => {
    dispatch(updateCrobJobSettings('doc:cronjob', JSON.stringify(values)));
  };

  return (
    <form className="row w-100 mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-6">
        <div className="form-group">
          <label className="d-block" htmlFor="formGroupExampleInput">
            <b className="f-w-500" style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 14 }}>
              Select hour
            </b>
          </label>

          <Controller
            control={control}
            name="hour"
            render={({ onChange, onBlur, value }) => (
              <Select value={value} style={{ width: 150 }} onBlur={onBlur} onChange={onChange}>
                {Array(23)
                  .fill()
                  .map((h, i) => {
                    let hour = i + 1;
                    // var ampm = hour >= 12 ? 'PM' : 'AM';
                    let hr = hour >= 12 ? (hour - 12 === 0 ? 12 + ' PM' : hour - 12 + ' PM') : hour + ' AM';
                    return (
                      <Select.Option key={i} value={hour}>
                        {hr}
                      </Select.Option>
                    );
                  })}
              </Select>
            )}
          />
        </div>
      </div>
      <div className="col-6">
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">
            <b className="f-w-500" style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 14 }}>
              Cron Job Enabled{' '}
            </b>
          </label>
          <br />

          <Controller
            control={control}
            name="enabled"
            render={({ onChange, onBlur, value }) => (
              <Switch onBlur={onBlur} onChange={onChange} checked={value} checkedChildren="Enable" unCheckedChildren="Disable" />
            )}
          />
        </div>
      </div>
      <div className="col-12">
        <Button htmlType="submit" disabled={!formState.isValid}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CronJobSettingForm;
