import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SelectField, MonthPicker } from '../inputs';
import projectsActions from '../../redux/projects/actions';
import moment from 'moment';
import { useState } from 'react';
const { addAllocation } = projectsActions;

const CreateAllocationForm = () => {
  const dispatch = useDispatch();
  const { relatedUsers } = useSelector(({ Auth }) => Auth);
  const projectsData = useSelector(({ projects }) => projects.projects);

  const [projectOptions, setProjects] = useState([])
  const [userOptions, setUsers] = useState([])

  useEffect(() => {
    if (projectsData) {
      const Projects = projectsData.map(item => {
        return {
          id: item?.internalId,
          value: `${item?.name} - ${item?.type}`
        }
      })
      setProjects(Projects);
    }
  }, [projectsData]);

  useEffect(() => {
    if (relatedUsers) {
      const users = relatedUsers.map(item => {
        return {
          id: item?.internalId,
          value: item?.username
        }
      })
      setUsers(users);
    }
  }, [relatedUsers]);


  const { handleSubmit, control, formState, errors, reset, watch, defaultValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      month: '', user: '', project: '',
    },
  });

  const onSubmit = (values) => {
    dispatch(addAllocation({
      month: moment(values.month).format('MMMM'),
      user: { internalId: values.user },
      project: { internalId: values.project }
    }))
    reset();
  };

  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-4">
          <Controller
            as={MonthPicker}
            control={control}
            label="Month"
            name="month"
            errors={errors}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>

        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="User"
            name="user"
            errors={errors}
            options={userOptions}
            rules={{
              required: 'Required Field',
            }}
          />
        </div>


        <div className="form-group col-4">
          <Controller
            as={SelectField}
            control={control}
            label="project"
            name="project"
            errors={errors}
            options={projectOptions}
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

export default CreateAllocationForm;
