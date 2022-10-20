import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button } from '../../inputs';
import settingActions from '../../../redux/setting/actions';
const { changePassword } = settingActions;

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { oldPassword: '', newPassword: '', verifyPassword: '' },
  });

  const onSubmit = (values) => {
    dispatch(changePassword(values));
    reset();
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-12 col-lg-5">
          <Controller
            as={InputField}
            control={control}
            label="Old password:"
            name="oldPassword"
            type="password"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-12 col-lg-5">
          <Controller
            as={InputField}
            control={control}
            label="New password:"
            name="newPassword"
            type="password"
            errors={errors}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                if (value.length > 4) return true;
                else return 'Password must be at least 6 characters long.';
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
            label="Verify password:"
            name="verifyPassword"
            type="password"
            errors={errors}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                if (value === watch('newPassword')) return true;
                else return "Password doesn't match!";
              },
            }}
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

export default ChangePasswordForm;
