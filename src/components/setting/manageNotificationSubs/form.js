import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { validateEmail } from '../../../helpers/utility';
import { InputField, CheckboxGroupField, Button } from '../../inputs';
import notificationActions from '../../../redux/notification/actions';
import settingActions from '../../../redux/setting/actions';
const { addSubscriber } = notificationActions;
const { updateSetting } = settingActions;

const EmailSettingsForm = ({ statusDefaultValue }) => {
  const dispatch = useDispatch();
  const subs = useSelector(({ notification }) => notification.notificationSubs);
  const { handleSubmit, control, formState, watch, register, errors, reset, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { email: '' },
  });
  const handleOnChangeStatus = (values) => {
    dispatch(updateSetting('setting:email-status', JSON.stringify(values)));
  };
  const onSubmit = (values) => {
    dispatch(addSubscriber(values));
  };
  // Reset form when subscriber added
  useEffect(() => reset(), [subs]);
  const options = [
    { label: 'Acceptance', value: 0 },
    { label: 'Rejection', value: 1 },
  ];
  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-12 col-lg-4">
          <Controller
            as={InputField}
            control={control}
            label="E-Mail:"
            name="email"
            placeholder="info@example.com"
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

        <div className="form-group col-4 col-lg-3 mt-5">
          <Button size="default" htmlType="submit" type="primary" disabled={!formState.isValid}>
            Add
          </Button>
        </div>
        <div className="form-group col-12 col-lg-4">
          <CheckboxGroupField
            defaultValue={statusDefaultValue?.value || []}
            options={options}
            label="Sending E-Mail Status:"
            name="status"
            errors={{}}
            onChange={handleOnChangeStatus}
          />
        </div>
      </div>
    </form>
  );
};

export default EmailSettingsForm;
