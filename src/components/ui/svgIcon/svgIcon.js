import React, { PropTypes as PT } from 'react';
import css from './svgIcon.styl';

export const SvgIcon = ({ glyph }) => (
    <svg className={css.root}>
        <use xlinkHref={glyph} />
    </svg>
);

SvgIcon.propTypes = {
    glyph: PT.string,
};
