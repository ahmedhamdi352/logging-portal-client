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
  const { user } = useSelector(({ Auth }) => Auth);


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
      console.log(defaultValues)
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
    { id: 480, value: 480 },
    { id: 540, value: 540 },
    { id: 600, value: 600 },
  ]

  const onSubmit = (values) => {
    dispatch(updateLog(logId, {
      learning: Number(values.learning),
      planned: Number(values.planned),
      internalSupport: Number(values.internalSupport),
      externalSupport: Number(values.externalSupport),
      knowledgeSharing: Number(values.knowledgeSharing),
      teamMeetings: Number(values.teamMeetings),
      dailyStandup: Number(values.dailyStandup),
      // 'user': { internalId: user?.id },
      // 'day': moment(values.date).format('dddd'),
      // 'date': moment(values.date).format('YYYY-MM-DD'),
      'collaboration': Number(values.knowledgeSharing) + Number(values.teamMeetings) + Number(values.dailyStandup),
      'support': Number(values.internalSupport) + Number(values.externalSupport),
      'manHour': (Number(values.knowledgeSharing) + Number(values.teamMeetings) + Number(values.dailyStandup) + Number(values.internalSupport) + Number(values.externalSupport) + Number(values.planned) + Number(values.learning)) / 60
    }))
    reset()
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="knowledge Sharing"
            name="knowledgeSharing"
            errors={errors}
            options={options}
            type='number'
            defaultValue={0}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                console.log(value % 60)
                if (value % 60 === 0 || value % 60 === 30 || value % 60 === 15 || value % 60 === 45) return true;
                else return 'Worng Format';
              },
            }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Team Meetings"
            name="teamMeetings"
            errors={errors}
            options={options}
            type='number'
            defaultValue={0}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                console.log(value % 60)
                if (value % 60 === 0 || value % 60 === 30 || value % 60 === 15 || value % 60 === 45) return true;
                else return 'Worng Format';
              },
            }} />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Daily Standup"
            name="dailyStandup"
            errors={errors}
            options={options}
            type='number'
            defaultValue={0}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                console.log(value % 60)
                if (value % 60 === 0 || value % 60 === 30 || value % 60 === 15 || value % 60 === 45) return true;
                else return 'Worng Format';
              },
            }} />
        </div>
      </div>

      <div className="row">

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Learning"
            name="learning"
            errors={errors}
            options={options}
            type='number'
            rules={{
              required: 'Required Field',
              validate: (value) => {
                console.log(value % 60)
                if (value % 60 === 0 || value % 60 === 30 || value % 60 === 15 || value % 60 === 45) return true;
                else return 'Worng Format';
              },
            }} />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Planned"
            name="planned"
            errors={errors}
            options={options}
            type='number'
            rules={{
              required: 'Required Field',
              validate: (value) => {
                console.log(value % 60)
                if (value % 60 === 0 || value % 60 === 30 || value % 60 === 15 || value % 60 === 45) return true;
                else return 'Worng Format';
              },
            }} />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="External Support"
            name="externalSupport"
            errors={errors}
            options={options}
            type='number'
            rules={{
              required: 'Required Field',
              validate: (value) => {
                console.log(value % 60)
                if (value % 60 === 0 || value % 60 === 30 || value % 60 === 15 || value % 60 === 45) return true;
                else return 'Worng Format';
              },
            }} />
        </div>

        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            label="Internal Support"
            name="internalSupport"
            errors={errors}
            options={options}
            type='number'
            rules={{
              required: 'Required Field',
              validate: (value) => {
                console.log(value % 60)
                if (value % 60 === 0 || value % 60 === 30 || value % 60 === 15 || value % 60 === 45) return true;
                else return 'Worng Format';
              },
            }} />
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
