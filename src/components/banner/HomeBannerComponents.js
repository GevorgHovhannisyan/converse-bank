import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { skBannerLoading } from '../../redux/slices/settings/settings';
import CreateSkeleton from "../hoc/skeleton";
const getImage = (image) => {
  return image;
};

const HomeBannerComponent = ({ banner }) => {
  const {lang} = useParams();
  const skBanner = useSelector(skBannerLoading);
  return (
    <div className="page_container">
        <div className="home_banner_inner">
          {skBanner ? <CreateSkeleton span={false} number={3}/> : (<>
            <div className="banner_img"> <img className="banner_image" width="1200" height="300" src={getImage(banner.image)} alt={banner.title} title={banner.title} rel="noreferrer" /></div>
            <div className="banner_info">
                <div className="section_title">{banner.title}</div>
                <div className="banner_description" dangerouslySetInnerHTML={{ __html: banner.body }}></div>
                <a href={`${banner.url}`} target="_blank"  rel="noreferrer" className="primary_btn"><FormattedMessage id="More" /></a>
            </div>
            </>)}
        </div>
    </div>
  );
};

export { HomeBannerComponent };
