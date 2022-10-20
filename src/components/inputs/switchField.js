import React from 'react';
import PropTypes from 'prop-types';
import { Form, Switch } from 'antd';
import ErrorMessage from './errorMessage';
class SwitchField extends React.Component {
  render() {
    const { name, label, errors, value } = this.props;
    const errorMessage = errors[name] ? errors[name].message : '';
    const validateStatus = errorMessage ? 'error' : '';
    return (
      <Form.Item label={label || ''} validateStatus={validateStatus} help={<ErrorMessage name={name || 'NULL'} errors={errors || {}} />}>
        <Switch {...this.props} checkedChildren="Enable" unCheckedChildren="Disable" checked={value} />
        {/* <Switch onBlur={onBlur} onChange={onChange} checked={value} checkedChildren="Enable" unCheckedChildren="Disable" /> */}
      </Form.Item>
    );
  }
}

SwitchField.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  label: PropTypes.string,
};

export default SwitchField;
