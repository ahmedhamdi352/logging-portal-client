import React, { useEffect } from 'react';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { countryList, receiverTypes } from '../../../helpers/defaults';
import { InputField, SelectField, Button } from '../../inputs';

const AddReceiverForm = () => {
  const { handleSubmit, control, formState, watch, register, errors, reset, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      type: 'B',
      country: 'EG',
      name: '',
      id: '',
      governate: '',
      regionCity: '',
      street: '',
      buildingNumber: '',
      postalCode: '',
      floor: '',
      room: '',
      landmark: '',
      additionalInformation: '',
    },
  });
  // Set country code to EG if Business type = B
  useEffect(() => {
    if (watch('type') === 'B') {
      setValue('country', 'EG');
    }
  }, [watch('type')]);

  const onSubmit = (values) => {
    console.log('values', values);
    // dispatch(updateSetting('doc:cronjob', JSON.stringify(values)));
  };

  return (
    <form className="mt-2 mb-0" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-12 col-lg-5">
          <Controller as={InputField} control={control} label="Name:" name="name" errors={errors} rules={{ required: 'Required Field' }} />
        </div>
        <div className="form-group col-12 col-lg-4">
          <Controller
            as={InputField}
            control={control}
            label="Registration number:"
            name="id"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
        <div className="form-group col-12 col-lg-2">
          <Controller
            as={SelectField}
            control={control}
            label="Type:"
            name="type"
            errors={errors}
            options={receiverTypes}
            defaultValue={'B'}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <Divider />

      <div className="row">
        <div className="form-group col-12 col-lg-2">
          {watch('type') === 'B' ? (
            <Controller
              as={InputField}
              control={control}
              label="Country Code:"
              name="country"
              defaultValue="EG"
              disabled
              errors={errors}
              rules={{ required: 'Required Field' }}
            />
          ) : (
            <Controller
              as={SelectField}
              control={control}
              label="Country Code:"
              name="country"
              errors={errors}
              options={countryList}
              // defaultValue={'EG'}
              value={'DZ'}
              rules={{ required: 'Required Field' }}
            />
          )}
        </div>
        <div className="form-group col-12 col-lg-2">
          <Controller as={InputField} control={control} label="Governate:" name="governate" errors={errors} rules={{ required: 'Required Field' }} />
        </div>
        <div className="form-group col-12 col-lg-2">
          <Controller
            as={InputField}
            control={control}
            label="Region City:"
            name="regionCity"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
        <div className="form-group col-12 col-lg-3">
          <Controller as={InputField} control={control} label="Street:" name="street" errors={errors} rules={{ required: 'Required Field' }} />
        </div>
        <div className="form-group col-12 col-lg-3">
          <Controller
            as={InputField}
            control={control}
            label="Building Number:"
            name="buildingNumber"
            errors={errors}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>
      <Divider className="mb-3" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)' }} dashed>
        Optional Fields
      </Divider>

      <div className="row">
        <div className="form-group col-12 col-lg-2">
          <Controller as={InputField} control={control} label="Postal Code:" name="postalCode" errors={errors} />
        </div>
        <div className="form-group col-12 col-lg-2">
          <Controller as={InputField} control={control} label="Floor:" name="floor" errors={errors} />
        </div>
        <div className="form-group col-12 col-lg-2">
          <Controller as={InputField} control={control} label="Room:" name="room" errors={errors} />
        </div>
        <div className="form-group col-12 col-lg-3">
          <Controller as={InputField} control={control} label="Landmark:" name="landmark" errors={errors} />
        </div>
        <div className="form-group col-12 col-lg-3">
          <Controller as={InputField} control={control} label="Additional Information:" name="additionalInformation" errors={errors} />
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="form-group col-3 col-lg-1">
          <Button size="large" htmlType="submit" type="primary">
            Save
          </Button>
        </div>
        <div className="form-group col-3 col-lg-1">
          <Button size="large" onClick={() => reset()} type="ghost">
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddReceiverForm;
