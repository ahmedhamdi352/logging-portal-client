import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SelectField, } from '../inputs';
import projectsActions from '../../redux/projects/actions';
import { useEffect } from 'react';
const { createProject, editProject } = projectsActions;

const UpdateLogForm = ({ handleCancel, defaultValues, typeOptions, countryOption }) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '', type: '', country: '', customer: '', soNumber: '', logTypes: []
    },
  });

  useEffect(() => {
    if (defaultValues !== null) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (values) => {
    if (defaultValues !== null) {
      dispatch(editProject(defaultValues?.internalId,
        {
          ...values,
          customer: values.customer === '' ? null : values.customer,
          soNumber: values.soNumber === '' ? null : values.soNumber,
          type: { internalId: values.type },
          logTypes: values.logTypes.join()

        }))
    }
    else {
      dispatch(createProject({
        ...values,
        customer: values.customer === '' ? null : values.customer,
        soNumber: values.soNumber === '' ? null : values.soNumber,
        type: { internalId: values.type },
        logTypes: values.logTypes.join()
      }))
    }
    handleCancel()
    reset()
  };


  const options = [
    {
      id: 'planned',
      value: 'planned'
    },
    {
      id: 'personal-learning',
      value: 'personal-learning'
    },
    {
      id: 'accepted-learning',
      value: 'accepted-learning'
    },
    {
      id: 'internal-support',
      value: 'internal-support'
    },
    {
      id: 'external-support',
      value: 'external-support'
    },
    {
      id: 'team-meetings',
      value: 'team-meetings'
    },
    {
      id: 'daily-standup',
      value: 'daily-standup'
    },
    {
      id: 'knowledge-sharing',
      value: 'knowledge-sharing'
    }
  ]
  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">

        <div className="form-group col-6">
          <Controller
            as={InputField}
            control={control}
            label="Name"
            name="name"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        <div className="form-group col-6">
          <Controller
            as={SelectField}
            options={typeOptions}
            control={control}
            label="Type"
            name="type"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        <div className="form-group col-6">
          <Controller
            as={InputField}
            control={control}
            label="Customer"
            name="customer"
            errors={errors}
          // rules={{
          //   required: 'Required Field',
          // }}
          />
        </div>

        <div className="form-group col-6">
          <Controller
            as={InputField}
            control={control}
            label="Sales order Number"
            name="soNumber"
            type="number"
            errors={errors}
          // rules={{
          //   required: 'Required Field',
          // }}
          />
        </div>

        <div className="form-group col-6">
          <Controller
            as={SelectField}
            options={countryOption}
            control={control}
            label="Country"
            name="country"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        <div className="form-group col-6">
          <Controller
            as={SelectField}
            control={control}
            mode="multiple"
            options={options}
            label="Log types"
            name="logTypes"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

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

export default UpdateLogForm;
