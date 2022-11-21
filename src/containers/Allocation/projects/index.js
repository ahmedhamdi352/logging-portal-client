import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import Loader from '../../../components/utility/loader';
import projectsActions from '../../../redux/projects/actions';
import typesActions from '../../../redux/project-types/actions';
import ProjectsTable from '../../../components/projects/projectsTable';
import CreateNewProject from '../../../components/projects/createNewProjectModal'
import { Layout } from 'antd';
import { Button } from 'antd';

const { getProjects, flushProjects } = projectsActions;
const { getTypes, flushTypes } = typesActions;

const { Content } = Layout;

const AllDocuments = () => {
  const [projects, setProjects] = useState([]);

  const [openCreateModal, setOpenModal] = useState(false)

  const projectsData = useSelector(({ projects }) => projects.projects);
  const loading = useSelector(({ projects }) => projects.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTypes());
    return () => {
      dispatch(flushProjects());
      dispatch(flushTypes());
    };
  }, [dispatch]);

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData);
    }
  }, [projectsData]);

  return (
    <LayoutWrapper>
      <Content style={{ padding: '0 20px', marginTop: '-10px' }}>
        {loading ? (
          <Loader />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
            <Button for="file-upload" class="custom-file-upload" style={{
              padding: '6px 12px',
              color: 'white', backgroundColor: '#2D3446',
              borderRadius: '4px', border: '1px solid #ccc',
              margin: '5px', textAlign: 'center', marginTop: '0px'
            }}
              onClick={() => setOpenModal(true)}
            >
              Create New Project
            </Button>

            <div
              style={{
                borderRadius: '10px',
                boxShadow: '0 7px 12px 0 rgba(22,37,63,.09)',
                background: '#fff',
                width: '100%',
              }}
            >
              <ProjectsTable docs={projects} />
            </div>
          </div>
        )}
      </Content>
      {openCreateModal && <CreateNewProject visible={openCreateModal} handleCancel={() => setOpenModal(false)} />}
      <ToastContainer autoClose={4000} hideProgressBar={true} />
    </LayoutWrapper>
  );
};

export default AllDocuments;
