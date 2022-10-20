import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { InputField, Button, SelectField } from '../../inputs';
import roleActions from '../../../redux/role/actions';
import { Divider } from 'antd';

const { createRole, updateRole } = roleActions;

const RoleForm = ({ permissionsList, defaultValues, formType, editableRole, closeModal }) => {
  const [options] = useState(permissionsList.map(({ label, value }) => ({ id: value, value: label })));
  const roles = useSelector(({ role }) => role.roles);
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, errors, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);
  useEffect(() => {
    if (roles) reset();
  }, [roles]);
  const onSubmit = (values) => {
    if (formType === 'add') {
      dispatch(createRole(values));
    } else if (formType === 'edit') {
      dispatch(updateRole(editableRole.internalId, values));
      closeModal();
    }
  };
  return (
    <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-12 col-lg-5">
          <Controller as={InputField} control={control} label="Role Name:" name="name" errors={errors} rules={{ required: 'Required Field' }} />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-12">
          <Controller
            as={SelectField}
            mode="multiple"
            control={control}
            label="Permissions:"
            name="permissions"
            errors={errors}
            options={options}
            rules={{ required: 'Required Field' }}
          />
        </div>
      </div>

      <Divider />
      <div className="row">
        <div className="form-group col-4 col-lg-1">
          <Button size="large" htmlType="submit" type="primary" disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

RoleForm.propTypes = {
  permissionsList: PropTypes.array.isRequired,
  defaultValues: PropTypes.object.isRequired,
  formType: PropTypes.string.isRequired,
  editableRole: PropTypes.object,
};
export default RoleForm;
