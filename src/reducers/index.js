import { combineReducers } from 'redux';

import { exampleReducers } from './example';

const mainReducers = {
    main: combineReducers({
        ...exampleReducers,
    }),
};

export const applicationReducers = Object.assign(
    {},
    mainReducers
);
