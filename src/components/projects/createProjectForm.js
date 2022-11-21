import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SelectField, } from '../inputs';
import projectsActions from '../../redux/projects/actions';
import { useEffect } from 'react';
const { createProject, editProject } = projectsActions;

const UpdateLogForm = ({ handleCancel, defaultValues, typeOptions }) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '', type: ''
    },
  });

  useEffect(() => {
    if (defaultValues !== null) {
      console.log("here", defaultValues)
      reset({ name: defaultValues?.name, type: defaultValues?.type });
    }
  }, [defaultValues, reset]);

  const onSubmit = (values) => {
    if (defaultValues !== null) {
      dispatch(editProject(defaultValues?.internalId, { name: values.name, type: { internalId: values.type } }))
    }
    else {
      dispatch(createProject({ name: values.name, type: { internalId: values.type } }))
    }
    handleCancel()
    reset()
  };

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

        {/* <ColorPicker color={color} setColor={setColor} /> */}

      </div>
      <Divider />
      <div className="row">
        <div className="form-group col-4 col-lg-1">
          {/* disabled={!formState.isValid} */}
          <Button size="large" htmlType="submit" type="primary" disabled={!formState.isValid} >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateLogForm;
