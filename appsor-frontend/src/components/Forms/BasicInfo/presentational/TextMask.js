import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

function ContactNoMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        '(', /\+/, /6/, /3/, ')', ' ',
        /9/, /\d/, /\d/, ' ', /\d/, /\d/,
        /\d/, ' ', /\d/, /\d/, /\d/, /\d/,
      ]}
      placeholderChar={'\u2000'}
      keepCharPositions
      showMask
    />
  );
}

ContactNoMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function StudentNoMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        /2/, /0/, /\d/, /\d/, '-',
        /\d/, /\d/, /\d/, /\d/, /\d/,
      ]}
      placeholderChar={'\u2000'}
      keepCharPositions
      showMask
    />
  );
}

StudentNoMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export { ContactNoMask, StudentNoMask };
