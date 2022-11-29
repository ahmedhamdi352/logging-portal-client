import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import typesActions from '../../../redux/project-types/actions';
import userActions from '../../../redux/auth/actions';
import projectsActions from '../../../redux/projects/actions';
import AllocationForm from '../../../components/project-allocation/allcationForm';

const LoggingShet = () => {

  const dispatch = useDispatch();
  const { getProjects, flushProjects } = projectsActions;
  const { getTypes, flushTypes } = typesActions;
  const { getRelatedUsers, flushRelatedUsers } = userActions;

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTypes());
    dispatch(getRelatedUsers())
    return () => {
      dispatch(flushProjects());
      dispatch(flushTypes());
      dispatch(flushRelatedUsers())
    };
  }, [dispatch]);

  return (
    <div className="pl-4">
      <span className="setting-label">Assign project to user</span>
      <Divider className="mt-0 mb-0" />
      <AllocationForm />
    </div>
  );
};

export default LoggingShet;
