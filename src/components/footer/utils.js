import moment from 'moment';
export const detectLastUpdatePage = ({ pathname, lang, siteSettings }) => {
  let lastDate = '';
  const endsWithSlash = pathname.endsWith('/');
  const splitPath = pathname.split('/');
  if (lang) {
    if (endsWithSlash) {
       if (splitPath.length > 3) {
        if (splitPath.includes('item')) {
          lastDate = 'innerPage';
        } else {
          lastDate = siteSettings.blog_listing_page_updated_date;
        }
      } else {
        lastDate = siteSettings.home_page_last_updated_date;
      }


    } else {
      if (splitPath.length > 2) {
        if (splitPath.includes('item')) {
          lastDate = 'innerPage';
        } else {
          lastDate = siteSettings.blog_listing_page_updated_date;
        }
      } else {
        lastDate = siteSettings.home_page_last_updated_date;
      }
    }
  } else {
    if (endsWithSlash) {
         if (splitPath.length > 2) {
          if (splitPath.includes('item')) {
            lastDate = 'innerPage';
          } else if(splitPath.includes('blog')) {
            lastDate = siteSettings.blog_listing_page_updated_date;
          }
        } else {
          lastDate = siteSettings.home_page_last_updated_date;
        }
  
  
      } else {
        if (splitPath.length > 1) {
          if (splitPath.includes('item')) {
            lastDate = 'innerPage';
          } else {
            lastDate = siteSettings.blog_listing_page_updated_date;
          }
        } else {
          lastDate = siteSettings.home_page_last_updated_date;
        }
      }
  }
  if(lastDate !== 'innerPage') {
    lastDate = moment(lastDate).format('DD.MM.YYYY HH:mm:ss')
  }
  return lastDate;
};
