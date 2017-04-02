import React, { PropTypes } from 'react';

import { SvgIcon } from 'components';
import css from './contentTabs.styl';

import { NavLink } from 'react-router-dom';
import cs from 'classnames';

export const ContentTabs = (props) => {
    const { children, tabList, onTabClick, disabled, itemCount } = props;

    // COMBINE CLASSES
    const counterCls = cs(css.counter, css.counterMaxWidth);
    const tabsCls = cs(css.tabs, {
        [css.tabsDisabled]: disabled,
    });
    //

    // VIEWS
    const Tabs = () => {
        return (
            <div className={tabsCls}>
                {tabList.map(({ name, link, icon, showCount }, i) => {
                    const linkProps = {
                        key: i,
                        className: css.tab,
                        activeClassName: css.tabActive,
                        exact: true,
                        to: `/${link}`,
                        isActive: (_, location) => location.pathname.includes(link),
                    };

                    if (onTabClick) {
                        linkProps.onClick = onTabClick.bind(null, link, i);
                    }

                    const Icon = () => {
                        return (
                            icon ? <span className={css.icon}><SvgIcon glyph={icon} /></span> : null
                        );
                    };

                    const Counter = () => {
                        return (
                            showCount ? <span className={counterCls}>{itemCount[link]}</span> : null
                        );
                    };

                    return (
                        <NavLink {...linkProps} >
                            <Icon />
                            <span className={css.text}>{name}</span>
                            <Counter />
                        </NavLink>
                    );
                })}
            </div>
        );
    };
    //

    return (
        <div>
            <Tabs />
            {children}
        </div>
    );
};

ContentTabs.propTypes = {
    activeUrl: PropTypes.string.isRequired,
    children: PropTypes.any,
    tabList: PropTypes.array,
    onTabClick: PropTypes.func,
    disabled: PropTypes.bool,
    itemCount: PropTypes.any,
};
