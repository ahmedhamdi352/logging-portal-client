import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SelectField, } from '../inputs';
import AuthActions from '../../redux/auth/actions';
import { useEffect } from 'react';
const { createUser, updateUser } = AuthActions;

const CreateUserForm = ({ handleCancel, defaultValues, roleOptions, directMangerOptions, employeeRole }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ Auth }) => Auth);
  const { handleSubmit, control, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '', lastName: '', username: '', email: '', password: '', phone: '', role: '',
      speciality: '', directManger: '',
    },
  });

  console.log(errors, !formState.isValid)

  useEffect(() => {
    if (defaultValues !== null) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (values) => {
    if (defaultValues !== null) {
      dispatch(updateUser(defaultValues?.internalId,
        {
          ...values,
          role: user.role === 'manger' ? employeeRole : values.role,
          directManger: user.role === 'manger' ? user?.id : values?.directManger
        }))
    }
    else {
      dispatch(createUser({
        ...values,
        role: user.role === 'manger' ? employeeRole : values.role,
        directManger: user.role === 'manger' ? user?.id : values?.directManger
      }))
    }
    handleCancel()
    reset()
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="First Name"
            name="firstName"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Last Name"
            name="lastName"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="UserName"
            name="username"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Email"
            name="email"
            errors={errors}
            rules={{
              required: 'Required Field',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            }}
          />
        </div>

        {!defaultValues && <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Password"
            name="password"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>}
        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Phone"
            name="phone"
            type="number"
            errors={errors}
            rules={{
              maxLength: { value: 11, message: 'Worng phone number' },
              minLength: { value: 11, message: 'Worng phone number' },
              required: 'Required Field',
            }}
          />
        </div>
        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Speciality"
            name="speciality"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        {user?.role !== 'manger' && <div className="form-group col-4">
          <Controller
            as={SelectField}
            options={roleOptions}
            control={control}
            label="Role"
            name="role"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>}

        {user?.role !== 'manger' && <div className="form-group col-4">
          <Controller
            as={SelectField}
            options={directMangerOptions}
            control={control}
            label="Direct Manger"
            name="directManger"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>}

      </div>
      <Divider />
      <div className="row">
        <div className="form-group col-4 col-lg-1">
          <Button size="large" htmlType="submit" type="primary" disabled={!formState.isValid} >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateUserForm;
