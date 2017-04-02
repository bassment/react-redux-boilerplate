import React, { PropTypes, Component } from 'react';

import css from './dropdownSimple.styl';
import cs from 'classnames';

export class DropdownSimple extends Component {
    static propTypes = {
        className: PropTypes.string,
        onItemClick: PropTypes.func,
        listItems: PropTypes.array.isRequired,
        activeItem: PropTypes.number.isRequired,
    };

    state = {
        active: false,
        activeItem: this.props.activeItem,
    }

    componentDidMount() {
        document.addEventListener('click', this.turnOffDropdownActive);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.turnOffDropdownActive);
    }

    // HELPERS
    toggleDropdownActive = (index) => {
        const { active } = this.state;
        this.setState({ active: !active, activeItem: index });
    }

    turnOnDropdownActive = () => {
        this.setState({ active: true });
    }

    turnOffDropdownActive = (e) => {
        if (!this.refs.dropdown.contains(e.target)) {
            this.setState({ active: false });
        }
    }
    //

    render() {
        const { toggleDropdownActive, turnOnDropdownActive } = this;
        const { active, activeItem } = this.state;
        const { className, listItems, onItemClick } = this.props;

        // COMBINE CLASSES
        const exampleCS = cs(css.selectLanguage, {
            [className]: className,
        });
        const listCS = cs(css.dropdownList, {
            [css.hide]: !active,
        });
        const valueCS = cs(css.dropdownValue, {
            [css.dropdownActive]: active,
        });
        //

        // VIEWS
        //

        return (
            <div ref='dropdown' className={exampleCS} onClick={turnOnDropdownActive}>
                <div className={css.dropdownWrap}>
                    <div className={valueCS}>{listItems[activeItem].name}</div>
                    <div className={listCS}>
                        {listItems.map(({ id, name, locale }, i) => {
                            const listItemProps = onItemClick
                            ? { onClick: () => {
                                toggleDropdownActive(i);
                                onItemClick({ id, name, locale });
                            } }
                            : { onClick: () => {
                                toggleDropdownActive(i);
                            } };

                            return i !== activeItem
                                ? <div key={i} className={css.listItem} {...listItemProps}>{name}</div>
                                : null;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
