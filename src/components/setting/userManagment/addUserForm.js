import React from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import settingActions from '../../../redux/setting/actions';
import { InputField, Button, SelectField, SwitchField } from '../../inputs';

const { createUser } = settingActions;

const UserForm = ({ roles }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors, reset } = useForm({
    defaultValues: { firstName: '', lastName: '', username: '', email: '', password: '', isActive: true, role: 1 },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (values) => {
    dispatch(createUser(values));
    reset();
    handleCancel();
  };
  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="First Name:"
            name="firstName"
            type="text"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Last Name:"
            name="lastName"
            type="text"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Username:"
            name="username"
            type="text"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="Password:"
            name="password"
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
      <div className="col-12">
        <div className="form-group">
          <Controller
            as={InputField}
            control={control}
            label="E-Mail:"
            name="email"
            type="email"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller
            as={SelectField}
            control={control}
            label="Role:"
            name="role"
            options={roles}
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller as={SwitchField} control={control} label="Active:" name="isActive" errors={errors} />
        </div>
      </div>
      <div className="col-12 ">
        <Button htmlType="submit" type="primary" disabled={!formState.isValid}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
