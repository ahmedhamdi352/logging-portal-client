import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { validateEmail, validateNumber } from '../../../helpers/utility';
import { InputField, Button } from '../../inputs';
import settingActions from '../../../redux/setting/actions';
const { updateSetting } = settingActions;

const EmailSettingsForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const onSubmit = (values) => {
    dispatch(updateSetting('setting:email-config', JSON.stringify(values)));
  };
  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-12 col-lg-5">
          <Controller as={InputField} control={control} label="SMTP Server:" name="host" errors={errors} rules={{ required: 'Required Field' }} />
        </div>
        <div className="form-group col-12 col-lg-5">
          <Controller
            as={InputField}
            control={control}
            label="Port:"
            name="port"
            min="0"
            type="number"
            errors={errors}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                if (value && validateNumber(value)) return true;
                else return 'Invalid Port';
              },
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-12 col-lg-5">
          <Controller
            as={InputField}
            control={control}
            label="Sender E-Mail:"
            name="sender"
            errors={errors}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                if (validateEmail(value)) return true;
                else return 'Invalid E-Mail address';
              },
            }}
          />
        </div>

        <div className="form-group col-12 col-lg-5">
          <Controller
            as={InputField}
            control={control}
            label="Password:"
            type="password"
            name="password"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="form-group col-4 col-lg-1">
          <Button size="large" htmlType="submit" type="primary" disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmailSettingsForm;
