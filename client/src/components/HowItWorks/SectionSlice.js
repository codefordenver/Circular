import React from 'react';
import PropTypes from 'prop-types';

const SectionSlice = ({ header, description, center = false, className, color }) => (
  <div className={className}>
    <h2
      className={color ? 'blue-color' : null}
      style={{ display: 'flex', justifyContent: center ? 'center' : 'flex-end' }}
    >
      {' '}
      {header}
    </h2>
    <p className={color ? 'blue-color' : null} style={{ textAlign: center ? 'center' : 'right' }}>
      {description}
    </p>
  </div>
);

export default SectionSlice;

SectionSlice.defaultProps = {
  header: '',
  description: '',
  center: false,
  className: 'how-it-works-sections-slices',
  color: false
};

SectionSlice.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.bool
};
