import { LIMIT_SHOWN_PAGES } from 'config';

export const activeRoute = (activeUrl) => activeUrl.split('/').slice(0, 2).join('/');
export const activePage = (activeUrl) => Number(activeUrl.split('/').slice(2));

export const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

export const fakeAjax = (obj) => {
    return new Promise((resolve, reject) => {
        if (!obj) {
            reject('No Argument');
            return;
        }
        setTimeout(() => resolve(obj), getRandomNumber(0, 2000));
    });
};

export const countPages = (itemsLength) => {
    return Math.ceil(itemsLength / LIMIT_SHOWN_PAGES);
};

export const parsePageFromQuery = (activeUrl, querySearch, { shift = 0, current }) => {
    const query = new URLSearchParams(querySearch);
    const page = current || (Number(query.get('p')) || 1) + shift;
    query.set('p', page);
    return `${activeUrl}?${query}`;
};

export const currentPageNumber = (querySearch) => {
    const query = new URLSearchParams(querySearch);
    return Number(query.get('p')) || 1;
};
