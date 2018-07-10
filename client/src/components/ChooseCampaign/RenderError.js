import React from 'react';

const RenderError = error => {
  if (error && error.searchError) {
    return (
      <div>
        <p>{error.userMessage}</p>
      </div>
    );
  }
};

export default RenderError;
