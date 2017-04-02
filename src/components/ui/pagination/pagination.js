import React, { PropTypes } from 'react';
import { NavLink, Link } from 'react-router-dom';

import css from './pagination.styl';
import cs from 'classnames';

export const Pagination = (props) => {
    const { setLinkTo, currentPage, className, disabled, pageLength } = props;

    // COMBINE CLASSES
    const paginationCls = cs(css.pagination, {
        [className]: className,
        [css.paginationDisabled]: disabled,
    });
    const prevButtonCls = cs(css.link, css.linkPrev);
    const nextButtonCls = cs(css.link, css.linkNext);
    //

    // VIEWS
    const PreviousButton = () => {
        return currentPage !== 1 ? (
            <div className={css.linkWrapper}>
                <Link
                    className={prevButtonCls}
                    to={setLinkTo({ shift: -1 })}
                >
                    ←&nbsp;Попередня
                </Link>
            </div>
        )
        : null;
    };

    const NextButton = () => {
        return currentPage !== pageLength ? (
            <div className={css.linkWrapper}>
                <Link
                    className={nextButtonCls}
                    to={setLinkTo({ shift: 1 })}
                >
                    Наступна&nbsp;→
                </Link>
            </div>
        )
        : null;
    };

    const PageNumbers = () => {
        const pagesRange = [...Array(pageLength).keys()].map((i) => i + 1);

        const START_OFFSET = 4;
        const END_OFFSET = 3;

        const startRange = pagesRange.slice(Math.max(0, currentPage - START_OFFSET), currentPage);
        const endRange = pagesRange.slice(currentPage, currentPage + END_OFFSET);

        let resultRange = [...startRange, ...endRange];

        if (pageLength > 7) {
            const lendEndPages = START_OFFSET - startRange.length;
            const lendStartPages = END_OFFSET - endRange.length;

            let additionalRange = [];
            if (lendEndPages) {
                const lastItemIndex = pagesRange.indexOf(endRange[endRange.length - 1]) + 1;
                additionalRange = pagesRange.slice(lastItemIndex, lastItemIndex + lendEndPages);
                resultRange = [...resultRange, ...additionalRange];
            } else if (lendStartPages) {
                const firstItemIndex = pagesRange.indexOf(startRange[0]);
                additionalRange = pagesRange.slice(firstItemIndex - lendStartPages, firstItemIndex);
                resultRange = [...additionalRange, ...resultRange];
            }
        }

        return (
            <div className={css.linkWrapper}>
                {resultRange.map((i) => {
                    return (
                        <NavLink
                            key={i}
                            activeClassName={css.linkActive}
                            className={css.link}
                            exact
                            to={setLinkTo({ current: i })}
                            isActive={() => i === currentPage}
                        >
                            {i}
                        </NavLink>
                    );
                })}
            </div>
        );
    };
    //

    return pageLength
        ? <div className={paginationCls}>
            <PreviousButton />
            <PageNumbers />
            <NextButton />
        </div>
        : null;
};

Pagination.propTypes = {
    setLinkTo: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageLength: PropTypes.number.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};
