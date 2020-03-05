import React from 'react';

function Error({ message }) {
  return (
    <>
      <h1>An Error Occurred:</h1>
      <p>{message}</p>
    </>
  );
}

export default Error;
