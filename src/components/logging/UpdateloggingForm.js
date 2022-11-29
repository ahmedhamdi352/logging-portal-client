import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SwitchField } from '../inputs';
import logsActions from '../../redux/logging/actions';
const { updateLog } = logsActions;

const UpdateLogForm = ({ logId, defaultValues }) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      knowledgeSharing: 0, teamMeetings: 0, dailyStandup: 0,
      learning: 0, planned: 0, externalSupport: 0, internalSupport: 0, vacation: false
    },
  });

  useEffect(() => {
    if (defaultValues) {
      console.log(defaultValues)
      reset({ ...defaultValues });
    }
  }, [defaultValues, reset]);
  const onSubmit = (values) => {
    if (!values.vacation) {
      dispatch(updateLog(logId, {
        learning: Number(values.learning),
        planned: Number(values.planned),
        internalSupport: Number(values.internalSupport),
        externalSupport: Number(values.externalSupport),
        knowledgeSharing: Number(values.knowledgeSharing),
        teamMeetings: Number(values.teamMeetings),
        dailyStandup: Number(values.dailyStandup),
        'collaboration': Number(values.knowledgeSharing) + Number(values.teamMeetings) + Number(values.dailyStandup),
        'support': Number(values.internalSupport) + Number(values.externalSupport),
        'manHour': (Number(values.knowledgeSharing) + Number(values.teamMeetings) + Number(values.dailyStandup) + Number(values.internalSupport) + Number(values.externalSupport) + Number(values.planned) + Number(values.learning)) / 60,
        'vacation': values?.vacation
      }))
    }
    else {
      dispatch(updateLog(logId, {
        learning: 0,
        planned: 0,
        internalSupport: 0,
        externalSupport: 0,
        knowledgeSharing: 0,
        teamMeetings: 0,
        dailyStandup: 0,
        'collaboration': 0,
        'support': 0,
        'manHour': 0,
        'vacation': values?.vacation
      }))
    }
    reset()
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-4">
          <Controller
            as={InputField}
            control={control}
            disabled={watch('vacation')}
            label="knowledge Sharing"
            name="knowledgeSharing"
            errors={errors}
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
            disabled={watch('vacation')}
            label="Team Meetings"
            name="teamMeetings"
            errors={errors}
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
            disabled={watch('vacation')}
            label="Daily Standup"
            name="dailyStandup"
            errors={errors}
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
            disabled={watch('vacation')}
            label="Learning"
            name="learning"
            errors={errors}
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
            disabled={watch('vacation')}
            label="Planned"
            name="planned"
            errors={errors}
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
            disabled={watch('vacation')}
            label="External Support"
            name="externalSupport"
            errors={errors}
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
            disabled={watch('vacation')}
            label="Internal Support"
            name="internalSupport"
            errors={errors}
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

        <div className="col-12 col-lg-6">
          <div className="form-group" >
            <Controller style={{ flexDirection: 'column', alignItems: 'center' }} as={SwitchField} control={control} label="Vacation:" name="vacation" errors={errors} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-4 d-flex">
          <p className='pr-2 font-weight-bold'>Collaboration:</p>
          <p>{watch('vacation') === true ? 0 : (Number(watch('knowledgeSharing')) + Number(watch('teamMeetings')) + Number(watch('dailyStandup'))) / 60}</p>
        </div>

        <div className="form-group col-4 d-flex">
          <p className='pr-2 font-weight-bold'>Support:</p>
          <p>{watch('vacation') === true ? 0 : (Number(watch('externalSupport')) + Number(watch('internalSupport'))) / 60}</p>
        </div>

        <div className="form-group col-4 d-flex">
          <p className='pr-2 font-weight-bold'>Man Hours:</p>
          <p>{watch('vacation') === true ? 0 : (Number(watch('externalSupport')) +
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
