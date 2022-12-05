import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, ColorPicker, SelectField, } from '../inputs';
import typesActions from '../../redux/project-types/actions';
import { useEffect } from 'react';
const { createType, editType } = typesActions;

const UpdateLogForm = ({ handleCancel, defaultValues }) => {
  const dispatch = useDispatch();

  const [color, setColor] = useState('#0000')



  const { handleSubmit, control, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '', color: '', logTypes: ''
    },
  });

  useEffect(() => {
    if (defaultValues !== null) {
      reset({ ...defaultValues });
      setColor(defaultValues?.color)
    }
  }, [defaultValues, reset]);

  const onSubmit = (values) => {
    if (defaultValues !== null) {
      dispatch(editType(defaultValues?.internalId, { ...values, color }))
    }
    else {
      dispatch(createType({ ...values, color }))
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

        <ColorPicker color={color} setColor={setColor} />

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
