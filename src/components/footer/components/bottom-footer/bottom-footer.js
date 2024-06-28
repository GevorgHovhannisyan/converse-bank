import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getPartnersListThunk } from '../../../../redux/thunks/menus/menuThunk';
import {partners_list,  skPartnersLoading
  // footer_info,
} from '../../../../redux/slices/navigation/navigation';
import { PartnersItemList } from '../top-footer/footerMenuList';
import settings from '../../../../settings/settings';
import { siteSettingsSelector } from '../../../../redux/slices/settings/settings';
import { blogArticleSelector } from '../../../../redux/slices/blog/blog';
import { getSettings } from '../../../../redux/thunks/settingsThunk';
import { useLocation, useParams } from 'react-router-dom';
import { detectLastUpdatePage } from '../../utils';
import CreateSkeleton from '../../../hoc/skeleton';
import moment from 'moment';
// import ReCaptcha from '../../../reCaptcha/reCaptchaComponent'
/* eslint-disable */
const BottomFooter = () => {
  const dispatch = useDispatch();
  let partners_items = useSelector(partners_list);
  let siteSettings = useSelector(siteSettingsSelector);
  let blogArticle = useSelector(blogArticleSelector);
  const [lastUpdate, setLastUpdate] = useState('');
  const skPartners = useSelector(skPartnersLoading);
  const { pathname } = useLocation();
  const { lang } = useParams();

  useEffect(() => {
    dispatch(getPartnersListThunk());
    dispatch(getSettings());
    const lastUpdateDate = detectLastUpdatePage({ pathname, lang, siteSettings });

    if(lastUpdateDate !== "innerPage") {
      setLastUpdate(lastUpdateDate);
    } else {
      setLastUpdate(moment(blogArticle.updated_at).format('DD.MM.YYYY HH:mm:ss'));
    }
  }, [dispatch, siteSettings?.home_page_last_updated_date, blogArticle?.updated_at, lang, pathname ]);


  return (
    <div className="info_footer">
      <div className="footer_description">
        <FormattedMessage id="Privacy and policy" />
        <br />
        <br />

        <FormattedMessage id="Converse bank is cotrolled by the CB of Armenia." />
        <br />
        <br />
        <FormattedMessage id="Last update" /> {lastUpdate}
      </div>
      <div className="bottom_block">
       <div className="inner_bottom">
         <div className="copyrights">
           © {new Date().getFullYear()}, Converse Bank,
           <a
               href={`mailto:${settings.webmaster_email}`}
           >{` ${settings.webmaster_email}`}</a>
         </div>
         <div className="developer"><FormattedMessage id="Developed by" /> <a href="https://www.studio-one.am/" target="_blank" rel="noreferrer">Studio One</a> </div>
       </div>
        <div className="finance_partners">
          {
            skPartners ? <CreateSkeleton span={false} number={4}/> : partners_items.menus &&
              partners_items.menus.length &&
              partners_items.menus.map((menu, index) => {
                return <PartnersItemList key={index} item={menu} />;
              })
          }
         
        </div>
      </div>
    </div>
  );
};
export default BottomFooter;
