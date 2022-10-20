import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'antd';
import ErrorMessage from './errorMessage';
class CheckboxGroupField extends React.Component {
  render() {
    const { name, label, errors, options } = this.props;
    const errorMessage = errors[name] ? errors[name].message : '';
    const validateStatus = errorMessage ? 'error' : '';
    return (
      <Form.Item label={label || ''} validateStatus={validateStatus} help={<ErrorMessage name={name || 'NULL'} errors={errors || {}} />}>
        <Checkbox.Group {...this.props} options={options} />
      </Form.Item>
    );
  }
}

CheckboxGroupField.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
};
export default CheckboxGroupField;
