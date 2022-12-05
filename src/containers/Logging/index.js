import React from 'react';
import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import projectActions from '../../redux/projects/actions';
import LoggingForm from '../../components/logging/loggingForm';
import { useEffect } from 'react';
import { useState } from 'react';

const LoggingShet = () => {

  const { userProjects } = useSelector(({ projects }) => projects);

  const [userProjectOptions, setUserProjects] = useState([{
    id: 'none', value: 'none'
  }])
  const [relatedProjects, setRelatedProjects] = useState([])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(projectActions.getUserProjects())
    return () => {
      dispatch(projectActions.flushProjects());
    };
  }, [])
  useEffect(() => {
    if (userProjects !== null) {
      setRelatedProjects(userProjects)
      const projectOptions = userProjects.map(item => {
        return {
          id: item?.internalId,
          value: item?.name
        }
      })
      setUserProjects([...userProjectOptions, ...projectOptions])
    }
  }, [userProjects])

  return (
    <div className="pl-4">
      <span className="setting-label">Log Your Time</span>
      <Divider className="mt-0 mb-0" />
      <LoggingForm projectOptions={userProjectOptions} userProjects={relatedProjects} />
    </div>
  );
};

export default LoggingShet;
