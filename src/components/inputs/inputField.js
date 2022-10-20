import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Upload } from 'antd';
import ErrorMessage from './errorMessage';
class InputField extends React.Component {
  render() {
    const { name, label, errors, prefix, size } = this.props;
    const errorMessage = errors[name] ? errors[name].message : '';
    const validateStatus = errorMessage ? 'error' : '';
    return (
      <Form.Item label={label || ''} validateStatus={validateStatus} help={<ErrorMessage name={name || 'NULL'} errors={errors || {}} />}>
        <Input {...this.props} prefix={prefix || null} size={size || 'default'} />
      </Form.Item>
    );
  }
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  prefix: PropTypes.any,
};
export default InputField;
