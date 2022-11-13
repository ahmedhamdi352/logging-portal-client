import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, DatePickerField, SelectField } from '../inputs';
import logsActions from '../../redux/logging/actions';
import moment from 'moment';
const { updateLog } = logsActions;

const UpdateLogForm = ({ logId, defaultValues, recordData }) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      knowledgeSharing: 0, teamMeetings: 0, dailyStandup: 0,
      learning: 0, planned: 0, externalSupport: 0, internalSupport: 0
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultValues });
    }
  }, [defaultValues, reset]);

  const options = [
    { id: 0, value: '0' },
    { id: 30, value: 30 },
    { id: 60, value: 60 },
    { id: 120, value: 120 },
    { id: 180, value: 180 },
    { id: 240, value: 240 },
    { id: 300, value: 300 },
    { id: 360, value: 360 },
    { id: 420, value: 420 },
  ]

  const onSubmit = (values) => {
    dispatch(updateLog(logId, {
      ...values,
      'user': { internalId: recordData?.user?.internalId },
      'day': recordData?.day,
      'date': recordData?.date,
      'collaboration': values.knowledgeSharing + values.teamMeetings + values.dailyStandup,
      'support': values.internalSupport + values.externalSupport,
      'manHour': (values.knowledgeSharing + values.teamMeetings + values.dailyStandup + values.internalSupport + values.externalSupport + values.planned + values.learning) / 60
    }))
    reset()
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="knowledge Sharing"
            name="knowledgeSharing"
            errors={errors}
            options={options}
            type='number'
            defaultValue={0}
            rules={{ required: 'Required Field' }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="Team Meetings"
            name="teamMeetings"
            errors={errors}
            options={options}
            type='number'
            defaultValue={0}
            rules={{ required: 'Required Field' }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="Daily Standup"
            name="dailyStandup"
            errors={errors}
            options={options}
            type='number'
            defaultValue={0}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>

      <div className="row">

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="Learning"
            name="learning"
            errors={errors}
            options={options}
            type='number'
            rules={{ required: 'Required Field' }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="Planned"
            name="planned"
            errors={errors}
            options={options}
            type='number'
            rules={{ required: 'Required Field' }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="External Support"
            name="externalSupport"
            errors={errors}
            options={options}
            type='number'
            rules={{ required: 'Required Field' }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="Internal Support"
            name="internalSupport"
            errors={errors}
            options={options}
            type='number'
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-4 d-flex">
          <p className='pr-2 font-weight-bold'>Collaboration:</p>
          <p>{(Number(watch('knowledgeSharing')) + Number(watch('teamMeetings')) + Number(watch('dailyStandup'))) / 60}</p>
        </div>

        <div className="form-group col-4 d-flex">
          <p className='pr-2 font-weight-bold'>Support:</p>
          <p>{(Number(watch('externalSupport')) + Number(watch('internalSupport'))) / 60}</p>
        </div>

        <div className="form-group col-4 d-flex">
          <p className='pr-2 font-weight-bold'>Man Hours:</p>
          <p>{(Number(watch('externalSupport')) +
            Number(watch('internalSupport')) +
            Number(watch('knowledgeSharing')) +
            Number(watch('teamMeetings')) +
            Number(watch('planned')) +
            Number(watch('learning')) +
            Number(watch('dailyStandup'))) / 60}</p>
        </div>
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
