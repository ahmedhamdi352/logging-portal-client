import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import EditEventForm from '../logging/UpdateloggingForm';
import moment from 'moment';
// import bookActions from '../../redux/book/actions';

const UpdateLogModal = ({ visible, handleCancel, editable, projectOptions, userProjects }) => {
  const dispatch = useDispatch()
  const [defaultValues, setDefaultValues] = useState(null);
  useEffect(() => {
    if (editable) {
      const {
        personalLearning,
        acceptedLearning,
        planned,
        internalSupport,
        externalSupport,
        knowledgeSharing,
        teamMeetings,
        dailyStandup,
        vacation,
        projectId
      } = editable;
      setDefaultValues({
        project: projectId, vacation, externalSupport, internalSupport, knowledgeSharing, dailyStandup, teamMeetings, acceptedLearning, personalLearning, planned
      });
    }
  }, [editable]);

  return (
    <Modal maskClosable={false} centered title={`Edit Log of ${editable?.day} ${moment(editable?.date).format('DD-MMM')}`} visible={visible} onCancel={handleCancel} footer={null}>
      <EditEventForm projectOptions={projectOptions} userProjects={userProjects} logId={editable?.internalId} defaultValues={defaultValues} recordData={editable} />
    </Modal>
  );
};

export default UpdateLogModal;
