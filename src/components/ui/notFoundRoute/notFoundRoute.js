import React, { PropTypes } from 'react';

import css from './notFoundRoute.styl';

export const NotFoundRoute = (props) => {
    const {} = css;
    const {} = props;

    // COMBINE CLASSES
    //

    // VIEWS
    //

    return (
        <h1 style={{ textAlign: 'center', marginTop: '300px' }}>
            NO SUCH ROUTE
        </h1>
    );
};

NotFoundRoute.propTypes = {
    message: PropTypes.string,
    match: PropTypes.object,
};
