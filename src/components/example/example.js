import React, { PropTypes } from 'react';

import css from './example.styl';
import cs from 'classnames';

export const Example = (props) => {
    const { className, exampleHelloWorld, message } = props;

    // COMBINE CLASSES
    const exampleCS = cs({
        [className]: className,
    });
    //

    // VIEWS
    //

    return (
        <div className={exampleCS}>
            <h1 className={css.header}>{message}</h1>
            <button onClick={() => exampleHelloWorld('world')}>World!</button>
        </div>
    );
};

Example.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    exampleHelloWorld: PropTypes.func,
};
