import React from 'react';
import PropTypes from 'prop-types';

import css from './svgIcon.styl';

export const SvgIcon = ({ glyph }) => (
  <svg className={css.root}>
    <use xlinkHref={glyph} />
  </svg>
);

SvgIcon.propTypes = {
  glyph: PropTypes.string.isRequired,
};
