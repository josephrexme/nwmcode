import React from 'react';
import PropTypes from 'prop-types';

function Error({ message }) {
  return (
    <>
      <h1>An Error Occurred:</h1>
      <p>{message}</p>
    </>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
