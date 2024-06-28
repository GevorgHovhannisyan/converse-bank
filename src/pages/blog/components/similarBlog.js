import { blogInnerPath} from '../../../helpers/Utils';
import { useParams, NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import CreateSkeleton from "../../../components/hoc/skeleton";
import moment from 'moment'

const SimilarBlogComponent = ({similarArticles}) => {
    const {lang} = useParams();
    const skBlogLoading = false //useSelector(blogSkLoading);


  return (
    <div className="page_container">
        <div className="narrow_container">
            <div className="title_block">
                <FormattedMessage id="Similar news" />
            </div>
            <ul>
                {similarArticles.map((blog, index) => {
                    return (
                        <li key={index}>
                        <div className="blog_block">
                            <NavLink
                                to={blogInnerPath(blog.slug, lang)}
                                className="img_blog"
                                key={index}
                            >
                                {!skBlogLoading ?
                                    <>{<img src={blog.image} width="296" height="140" title={blog.title}
                                            alt={blog.title}/>}</> :
                                    <CreateSkeleton className="img_blog" span={false} number={1}/>
                                }
                            </NavLink>
                            <div className="blog_info">
                                <div className="blog_date">{moment(blog.block_banner?.date).format('DD.MM.YYYY')}</div>
                                <NavLink
                                    to={blogInnerPath(blog.slug, lang)}
                                    className="blog_title"
                                    key={index}
                                >
                                    {blog.title}
                                </NavLink>
                                {blog.tags && !!blog.tags.length && (
                                    <div className="blog_category">
                                        {blog.tags.map((tag, index) => {
                                            if (tag.slug !== 'all') {
                                                return (
                                                    <NavLink
                                                        key={index}
                                                        className="category_items"
                                                        to={
                                                            lang
                                                                ? `/${lang}/blog/${tag.slug}`
                                                                : `/blog/${tag.slug}`
                                                        }
                                                    >
                                                        {tag.title}
                                                    </NavLink>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    )
                })}
            </ul>
        </div>

    </div>
  );
};
export default SimilarBlogComponent;
