import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, DatePickerField, SwitchField, SelectField } from '../inputs';
import logsActions from '../../redux/logging/actions';
import moment from 'moment';
import { useState } from 'react';
import { isEmpty } from '../../helpers/utility';
const { submitLogs } = logsActions;

const CreateLogForm = ({ projectOptions, userProjects }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ Auth }) => Auth);
  const [selectedProject, setSelectedProject] = useState([])

  const { handleSubmit, control, formState, errors, reset, watch, defaultValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      date: moment(), project: 'none', knowledgeSharing: 0, teamMeetings: 0, dailyStandup: 0,
      acceptedLearning: 0, personalLearning: 0, planned: 0, externalSupport: 0, internalSupport: 0, vacation: false
    },
  });

  useEffect(() => {
    const selected = userProjects.filter(item => item.internalId === watch('project'))
    if (!isEmpty(selected)) {
      setSelectedProject(selected[0]?.logTypes)
    }
  }, [watch('project'), userProjects])

  const onSubmit = (values) => {
    if (!values?.vacation) {
      dispatch(submitLogs({
        project: values.project === 'none' ? null : { internalId: values.project },
        acceptedLearning: Number(values.acceptedLearning),
        personalLearning: Number(values.personalLearning),
        planned: Number(values.planned),
        internalSupport: Number(values.internalSupport),
        externalSupport: Number(values.externalSupport),
        knowledgeSharing: Number(values.knowledgeSharing),
        teamMeetings: Number(values.teamMeetings),
        dailyStandup: Number(values.dailyStandup),
        'user': { internalId: user?.id },
        'day': moment(values.date).format('dddd'),
        'date': moment(values.date).format('YYYY-MM-DD'),
        'collaboration': Number(values.knowledgeSharing) + Number(values.teamMeetings) + Number(values.dailyStandup),
        'support': Number(values.internalSupport) + Number(values.externalSupport),
        'manHour': (Number(values.knowledgeSharing) + Number(values.teamMeetings) + Number(values.dailyStandup)
          + Number(values.internalSupport) + Number(values.externalSupport) +
          Number(values.planned) +
          Number(values.personalLearning) + Number(values.acceptedLearning)) / 60,
      }))
    }
    else {
      dispatch(submitLogs({
        acceptedLearning: 0,
        personalLearning: 0,
        planned: 0,
        internalSupport: 0,
        externalSupport: 0,
        knowledgeSharing: 0,
        teamMeetings: 0,
        dailyStandup: 0,
        'user': { internalId: user?.id },
        'day': moment(values.date).format('dddd'),
        'date': moment(values.date).format('YYYY-MM-DD'),
        'collaboration': 0,
        'support': 0,
        'manHour': 0,
        'vacation': values?.vacation,
        project: null
      }))

    }
    reset()
  };

  useEffect(() => {
    if (watch('project') !== 'none') {
      reset({
        project: watch('project'),
        date: watch('date'),
        knowledgeSharing: 0, teamMeetings: 0, dailyStandup: 0,
        acceptedLearning: 0, personalLearning: 0, planned: 0, externalSupport: 0, internalSupport: 0, vacation: false
      })
    }
  }, [watch('project')])

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-3">
          <Controller
            as={DatePickerField}
            control={control}
            label="Date"
            name="date"
            value={moment(defaultValues?.date).format()}
            errors={errors}
            rules={{
              required: 'Required Field',
              validate: (value) => {
                if (moment(value).isSameOrBefore(moment())) return true;
                else return 'Can not log future day';
              },
            }}
          />
        </div>

        <div className="form-group col-3">
          <Controller
            as={SelectField}
            control={control}
            disabled={watch('vacation')}
            options={projectOptions}
            label="Project"
            name="project"
            errors={errors}
          />
        </div>

        <div className="form-group col-3">
          <Controller
            as={InputField}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('personal-learning'))}
            control={control}
            label="Personal Learning"
            name="personalLearning"
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

        <div className="form-group col-3">
          <Controller
            as={InputField}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('accepted-learning'))}
            control={control}
            label="Accepted Learning"
            name="acceptedLearning"
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


      </div>
      <div className="row">

        <div className="form-group col-3">
          <Controller
            as={InputField}
            control={control}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('knowledge-sharing'))}
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

        <div className="form-group col-3">
          <Controller
            as={InputField}
            control={control}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('team-meetings'))}
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

        <div className="form-group col-3">
          <Controller
            as={InputField}
            control={control}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('daily-standup'))}
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


        <div className="form-group col-3">
          <Controller
            as={InputField}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('planned'))}
            control={control}
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

        <div className="form-group col-3">
          <Controller
            as={InputField}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('external-support'))}
            control={control}
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

        <div className="form-group col-3">
          <Controller
            as={InputField}
            control={control}
            disabled={watch('vacation') || (watch('project') !== 'none' && !selectedProject.includes('internal-support'))}
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
      </div>
      <div className="col-12 col-lg-6">
        <div className="form-group">
          <Controller as={SwitchField} control={control} label="Vacation:" name="vacation" errors={errors} />
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
            Number(watch('personalLearning')) +
            Number(watch('acceptedLearning')) +
            Number(watch('dailyStandup'))) / 60}</p>
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

export default CreateLogForm;
