import { NavLink, useParams } from 'react-router-dom';
import { blogInnerPath } from '../../helpers/Utils';
import moment from 'moment';
const getImage = (image) => {
  return image;
};
const dateFormat = (date) => {
  return moment(date).format('DD.MM.YYYY');
};
export const BlogItem = ({ blog, index,targetBlank}) => {
  const { lang } = useParams();
  return (
    <div key={index}>
      <NavLink
        to={blogInnerPath(blog.slug, lang,)}
        className="blog_block"
        key={index}
        target={targetBlank ? "_blank" : undefined}
      >
        <span className="blog_img">
          <picture>
            <source
              media="(max-width: 1024px)"
              srcSet={blog?.block_banner?.mobile_image}
            />
            <img
              src={getImage(blog.image)}
              width="387"
              height="241"
              alt={blog.title}
              title={blog.title}
            />
          </picture>
        </span>
        <span className="blog_info">
          <span className="blog_title">{blog.title}</span>
          <span className="blog_date">
            {dateFormat(blog.block_banner?.date)}
          </span>
        </span>
      </NavLink>
    </div>
  );
};
