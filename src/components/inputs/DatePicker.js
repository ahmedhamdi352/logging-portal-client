import React from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import ErrorMessage from './errorMessage';
class DatePickerField extends React.Component {
  render() {
    const { name, label, errors, prefix, size } = this.props;
    const errorMessage = errors[name] ? errors[name].message : '';
    const validateStatus = errorMessage ? 'error' : '';
    return (
      <Form.Item label={label || ''} validateStatus={validateStatus} help={<ErrorMessage name={name || 'NULL'} errors={errors || {}} />}>
        <DatePicker style={{ width: '100%' }} {...this.props} prefix={prefix || null} size={size || 'default'} />
      </Form.Item>
    );
  }
}

DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  prefix: PropTypes.any,
};
export default DatePickerField;
