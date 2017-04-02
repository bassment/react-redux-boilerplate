import React, { PropTypes, Component } from 'react';

import css from './noAvailableItems.styl';

export class NoAvailableItems extends Component {
    static propTypes = {
        onEnter: PropTypes.func,
    }

    componentWillMount() {
        const { onEnter } = this.props;
        if (onEnter) {
            onEnter();
        }
    }

    render() {
        const { noItems, noItemsIcon } = css;

        // COMBINE CLASSES
        //

        // VIEWS
        //

        return (
            <div className={noItems}>
                <i className={noItemsIcon}>i</i>
                <p>Немає товарів</p>
            </div>
        );
    }
}
