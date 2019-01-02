import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import preventDefaultEnter from '../helpers/preventDefaultEnter';

function FormTextField(props) {
  const {
    label,
    name,
    type,
    values,
    defaultValue,
    onChange,
    errors,
    className,
    ...other
  } = props;

  return (
    <TextField
      {...other}
      label={props.label}
      name={props.name}
      type={props.type}
      value={props.values[props.name] || props.defaultValue}
      onChange={props.onChange}
      error={typeof (props.errors) !== 'undefined' && !!props.errors[props.name]}
      helperText={typeof (props.errors) !== 'undefined' && props.errors[props.name]}
      className={`text-field ${props.className}`}
      onKeyPress={preventDefaultEnter}
    />
  );
}

FormTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  values: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  className: PropTypes.string.isRequired,
};

FormTextField.defaultProps = {
  type: '',
  defaultValue: '',
  errors: undefined,
};

export default FormTextField;
