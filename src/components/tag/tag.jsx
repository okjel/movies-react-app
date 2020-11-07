import React from 'react';
import PropTypes from 'prop-types';

import './tag.scss';

export default function Tag({ className }) {
  const classNameComponent = `${className} tag`;
  return <div className={classNameComponent}>name1</div>;
}

Tag.defaultProps = {
  className: '',
};

Tag.propTypes = {
  className: PropTypes.string,
};
