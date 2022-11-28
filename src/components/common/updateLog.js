import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import EditEventForm from '../logging/UpdateloggingForm';
import moment from 'moment';
// import bookActions from '../../redux/book/actions';

const UpdateLogModal = ({ visible, handleCancel, editable }) => {
  const dispatch = useDispatch()
  const [defaultValues, setDefaultValues] = useState(null);
  useEffect(() => {
    if (editable) {
      const {
        collaboration,
        support,
        manHour,
        learning,
        planned,
        internalSupport,
        externalSupport,
        knowledgeSharing,
        teamMeetings,
        dailyStandup,
        vacation
      } = editable;
      setDefaultValues({
        vacation, externalSupport, internalSupport, knowledgeSharing, dailyStandup, teamMeetings, learning, planned
      });
    }
  }, [editable]);

  console.log(editable)

  return (
    <Modal maskClosable={false} centered title={`Edit Log of ${editable?.day} ${moment(editable?.date).format('DD-MMM')}`} visible={visible} onCancel={handleCancel} footer={null}>
      <EditEventForm logId={editable?.internalId} defaultValues={defaultValues} recordData={editable} />
    </Modal>
  );
};

export default UpdateLogModal;
