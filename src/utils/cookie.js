/* eslint-env browser */
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const cookie = {
  set({ name, value = '', path = '/', domain = '', expires = '' }) {
    if (!canUseDOM) {
      return;
    }
    if (expires instanceof Date) {
      expires = expires.toUTCString();
    }
    document.cookie = [
      `${name}=${value}`,
      `path=${path}`,
      `domain=${domain}`,
      `expires=${expires}`,
    ].join(';');
  },

  unset(name) {
    cookie.set({ name, expires: new Date(0) });
  },

  get(name) {
    const re = new RegExp(
      [
        '(?:^|; )',
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
        '=([^;]*)',
      ].join(''),
    );

    const matches = document.cookie.match(re);

    return matches ? decodeURIComponent(matches[1]) : null;
  },
};

export default cookie;
