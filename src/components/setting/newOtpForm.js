import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import docActions from '../../redux/documents/actions';
import { InputField, Button, SelectField, SwitchField } from '../inputs';

const { sendOtp } = docActions;

const NewOtpForm = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const { selectedDocument } = useSelector(({ documents }) => documents);

  const { handleSubmit, control, formState, errors, reset } = useForm({
    defaultValues: { otp: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (values) => {
    console.log(selectedDocument)
    dispatch(sendOtp({
      otp: values?.otp,
      issuerId: selectedDocument?.issuer?.internalId
    }));
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
            label="New OTP:"
            name="otp"
            type="number"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
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

export default NewOtpForm;
