import { getRouteBlog, getRouteMain } from "../constants/router";

const createRoutePath = (menu_item, menu_list, lang, url, sortedPages) => {
  if (!menu_item.page_id && menu_item.url) {
    return { external: { url: menu_item.url, target: menu_item.target } };
  }

  sortedPages.unshift(menu_item);
  if (menu_item.parent_id) {
    const findFirstParent = getSubMenuItem(menu_list, menu_item.parent_id);
    createRoutePath(findFirstParent, menu_list, lang, url, sortedPages);
  }

  for (let i = 0; i < sortedPages.length; i++) {
    const page = sortedPages[i];
    url = url + page.url;
  }
  let new_url = '';

  if (lang) {
    new_url = `/${lang}${url}`;
  } else {
    new_url = url;
  }
  return { internal: { url: new_url } };
};

let getSubMenuItem = function (menu_items, id) {
  if (menu_items) {
    for (let i = 0; i < menu_items.length; i++) {
      if (menu_items[i].id === id) {
        return menu_items[i];
      }
      let found = getSubMenuItem(menu_items[i].children, id);
      if (found) return found;
    }
  }
};

const headerUrlFiltered = ({ lang, pathname }) => {
  if (lang) {
    let slicePath = pathname.substring(4);
    const endsWithSlash = slicePath.endsWith('/');

    if (endsWithSlash) {
      slicePath = slicePath.slice(0, -1);
    }
    return slicePath;
  } else {
    let slicePath = pathname.substring(1);
    const endsWithSlash = slicePath.endsWith('/');
    if (endsWithSlash) {
      slicePath = slicePath.slice(0, -1);
    }
    return slicePath;
  }
};

const absolutePath = (path) => {
  const pattern = /^https?:\/\//i;
  return pattern.test(path);
};

const changeToScript = (s) => {
  const pattern = new RegExp('<[^>]*script>', 'g');
  const pureScript = s.replace(pattern, '');
  const script = document.createElement('script');
  script.text = pureScript;
  return script;
};

const getScripts = (data) => {
  const pattern = new RegExp(
    '<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>',
    'gi'
  );
  const matches = data.matchAll(pattern);
  let scripts = [];
  for (const match of matches) {
    scripts.push(changeToScript(match[0]));
  }
  return scripts;
};

const removeScripts = (data) => {
  const pattern = new RegExp(
    '<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>',
    'gi'
  );
  const html = data.replace(pattern, '<div className="banner-block"></div>');
  return html;
};

const wrapTable = (data) => {
  const pattern = new RegExp(
    '<table\\b[^<]*(?:(?!<\\/table>)<[^<]*)*<\\/table>',
    'gi'
  );
  let changedHtml;
  if (data) {
    changedHtml = data;
    const matches = data.matchAll(pattern);
    for (const match of matches) {
      changedHtml = changedHtml.replace(
        match[0],
        `<div className="table_container">${match[0]}</div>`
      );
    }
    return changedHtml;
  }
};

const FilterNews = (news) => {
  let result = {};
  result.news = news.filter((elem) => {
    if (elem.main && !result.mainNews) {
      result.mainNews = elem;
      return false;
    } else {
      return true;
    }
  });
  return result;
};

const generateMenuTree = (data) => {
  const menuObj = {};
  for (const element of data) {
    const parent_id = element.parent_id ? element.parent_id : 0;
    menuObj[parent_id] = menuObj[parent_id] ? menuObj[parent_id] : [];
    menuObj[parent_id].push(element);
  }
  return menuObj;
};

const formatTranslations = (trans) => {
  const obj = {};
  for (const item of trans) {
    obj[item.term] = item.translations;
  }
  return obj;
};

const isTouchDevice = () => {
  return 'ontouchstart' in document.documentElement;
};

const blogTagPath = (tag, lang) => {
  if (tag.slug !== 'all') {
    return tag.slug;
  }

  const routeMain = getRouteMain();
  const routeBlog = getRouteBlog();

  if (lang) {
    return `${routeMain}${lang}/${routeBlog}`;
  }

  return `/${routeBlog}`;
};

const blogInnerPath = (slug, lang) => {
  if (lang) {
    return `/${lang}/blog/item/${slug}`;
  } else {
    return `/blog/item/${slug}`;
  }
};

const toggleClassList = (tag, className) => {
  if (!tag) {
    return;
  }

  if (tag.classList.contains(className)) {
    tag.classList.remove(className);
  } else {
    tag.classList.add(className);
  }
};

const sortCurrency = (payload) => {
  let currencySort = [];
  let maxLastUpdateArr = [];

  if (payload && Object.keys(payload).length) {
    if (payload['Cash']) {
      if (payload['Cash'].length) {
        payload['Cash'] = payload['Cash'].sort(
          (a, b) => a.currency.position - b.currency.position
        );
      }
      let cashObj = {
        title: 'Cash',
        data: payload['Cash'],
      };
      maxLastUpdateArr = maxLastUpdateArr.concat([...cashObj.data]);

      currencySort.push(cashObj);
    }
    if (payload['Non Cash']) {
      if (payload['Non Cash'].length) {
        payload['Non Cash'] = payload['Non Cash'].sort(
          (a, b) => a.currency.position - b.currency.position
        );
      }

      let cashObj = {
        title: 'Non Cash',
        data: payload['Non Cash'],
      };
      maxLastUpdateArr = maxLastUpdateArr.concat([...cashObj.data]);

      currencySort.push(cashObj);
    }
    if (payload['Metal']) {
      let cashObj = {
        title: 'Metal',
        data: payload['Metal'],
      };
      maxLastUpdateArr = maxLastUpdateArr.concat([...cashObj.data]);

      currencySort.push(cashObj);
    }
  }

  return { currencySort, maxLastUpdateArr };
};

const getGroupIdByLanguage = (language) => {
  switch (language) {
    case 'ru':
      return process.env.REACT_APP_LIVECHAT_GROUP_RU || '15';
    case 'en':
      return process.env.REACT_APP_LIVECHAT_GROUP_EN || '16';
    case undefined:
      return process.env.REACT_APP_LIVECHAT_GROUP_HY || '14';

    default:
      return process.env.REACT_APP_LIVECHAT_GROUP_HY || '14';
  }
};

export {
  absolutePath,
  getScripts,
  removeScripts,
  FilterNews,
  generateMenuTree,
  formatTranslations,
  wrapTable,
  createRoutePath,
  isTouchDevice,
  blogTagPath,
  headerUrlFiltered,
  blogInnerPath,
  toggleClassList,
  sortCurrency,
  getGroupIdByLanguage,
};


export function removeFirstSlash(inputString) {
  // Check if the string starts with a slash
  if (inputString.startsWith('/')) {
    inputString = inputString.slice(1);
  }

  return inputString;
}


export function removeLastSlash(inputString) {
  // Check if the string ends with a slash
  if (inputString.endsWith('/')) {
    inputString = inputString.slice(0, -1);
  }

  return inputString;
}
