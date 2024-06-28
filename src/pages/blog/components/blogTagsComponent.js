import { blogTagPath, blogInnerPath } from '../../../helpers/Utils';
import { FormattedMessage } from 'react-intl';
import SubscribeBlog from '../subscribe-blog/subscribe-blog';
import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateSkeleton from '../../../components/hoc/skeleton';
import {
  blogSkLoading,
  skCategoryBlogLoading,
} from '../../../redux/slices/blog/blog';
import settings from '../../../settings/settings.json';
import moment from 'moment';
const dateFormat = (date) => {
  return moment(date).format('DD.MM.YYYY');
};
/* eslint-disable */
const BlogTagsComponent = ({ blogTags }) => {
  const params = useParams();
  // // const skLoading = useSelector(blogTagskLoading);
  const category = params.category;
  const lang = params.lang;
  return (
    <ul className={`tags_list`}>
      {blogTags &&
        !!blogTags.length &&
        blogTags.map((tag, index) => {
          return (
            <li key={index}>
              <NavLink
                to={blogTagPath(tag, lang)}
                className={({ isActive }) => {
                  if (tag.slug !== 'all' && category && isActive) {
                    return 'active';
                  } else if (tag.slug === 'all' && category) {
                    return '';
                  } else if (tag.slug === 'all' && !category) {
                    return 'active';
                  }
                }}
              >
                {tag.title}
              </NavLink>
            </li>
          );
        })}
    </ul>
  );
};

const BlogListing = ({ blogs }) => {
  const { lang, category } = useParams();
  const skBlogLoading = useSelector(blogSkLoading);
  const skCatBlogLoading = useSelector(skCategoryBlogLoading);
  const loading = category ? skCatBlogLoading : skBlogLoading;

  return (
    <>
      {loading ? (
        <CreateSkeleton className="blog_list" span={true} number={4} />
      ) : (
        <ul className="blog_list">
          {blogs &&
            !!blogs.length &&
            (
              <>

                {blogs.map((blog, index) => (
                  <React.Fragment key={blog.id}>
                    <li>
                      <div className="blog_block">
                        <NavLink
                          to={blogInnerPath(blog.slug, lang)}
                          className="img_blog"
                          key={index}
                        >
                          {!skBlogLoading ? (
                            <img
                              src={blog.image}
                              width="296"
                              height="140"
                              title={blog.title}
                              alt={blog.title}
                            />
                          ) : (
                            <CreateSkeleton
                              className="img_blog"
                              span={false}
                              number={1}
                            />
                          )}
                        </NavLink>
                        <div className="blog_info">
                          <div className="blog_date">
                            {dateFormat(blog.block_banner?.date)}
                          </div>
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
                          <NavLink
                            to={blogInnerPath(blog.slug, lang)}
                            className="blog_title"
                            key={index}
                          >
                            {blog.title}
                          </NavLink>

                          <div className="blog_description">{blog.summary}</div>
                        </div>
                      </div>
                    </li>

                    {
                      index === 0 &&
                      <li className="tiitle_inner_blog">   <FormattedMessage id="Inner title" /> </li>
                    }
                  </React.Fragment>
                ))}
              </>
            )}
        </ul>
      )}
    </>
  );

};

const BestArticlesSlide = ({
  bestArticles,
  handleLoadMore,
  bestArticleMeta,
  page,
  lastPage,
}) => {
  const skBlogLoading = useSelector(blogSkLoading);
  const { lang } = useParams();
  const [displayedItems, setDisplayedItems] = useState(6);

  // const handleLoadMore = () => {
  //   setDisplayedItems((prevDisplayedItems) => prevDisplayedItems + 6);
  // };

  return (
    <>
      <div className="best_section">
        <div className="page_container">
          <div className="section_head">
            <h2 className="article_title">
              {skBlogLoading ? (
                <CreateSkeleton
                  className="article_title"
                  span={false}
                  number={1}
                />
              ) : (
                <FormattedMessage id="Best articles" />
              )}
            </h2>

            {/* <NavLink
                            to={lang ? '/' + lang + '/blog' : '/blog'}
                            className="view_more icon_right">
                            {skLoading ? <CreateSkeleton className="view_more" span={false} number={1}/> :
                                <FormattedMessage id="See more"/>}
                        </NavLink> */}
          </div>
          {skBlogLoading ? (
            <CreateSkeleton span={true} number={6} />
          ) : (
            <ul className="blog_category_slider">
              {bestArticles.map((blog, index) => (
                <li key={index}>
                  <div className="news_block">
                    <NavLink
                      to={blogInnerPath(blog.slug, lang)}
                      className="news_image"
                    >
                      {blog.image && (
                        <img
                          src={blog.image}
                          width="342"
                          height="190"
                          alt={blog.title}
                          title={blog.title}
                        />
                      )}
                      {blog.title}
                    </NavLink>
                    <div className="news_info">
                      <div className="news_date">
                        {dateFormat(blog.block_banner?.date)}
                      </div>
                      {blog.tags && !!blog.tags.length && (
                        <div className="blog_category">
                          {blog.tags.map((tag, index) => {
                            if (tag.slug !== 'all') {
                              return (
                                <NavLink
                                  to={
                                    lang
                                      ? `/${lang}/blog/${tag.slug}`
                                      : `/blog/${tag.slug}`
                                  }
                                  key={index}
                                  className="category_items"
                                >
                                  {tag.title}
                                </NavLink>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}
                      <NavLink
                        to={blogInnerPath(blog.slug, lang)}
                        className="news_title"
                      >
                        {blog.title}
                      </NavLink>
                      <div className="news_description">{blog.summary}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* {bestArticleMeta?.last_page > page && ( */}
          {lastPage > page && (
            <div
              onClick={handleLoadMore}
              className="view_more load_more_button icon_right"
            >
              <FormattedMessage id="See more" />
            </div>
          )}
          {/* )} */}
          {/* <NavLink to={lang ? `/${lang}/blog` : '/blog'} onClick={handleLoadMore} className="view_more load_more_button icon_right"> */}
          {/* <FormattedMessage id="See more" /> */}
          {/* </NavLink> */}
        </div>
      </div>
    </>
  );
};

const RenderArchiveBlogs = (archivedArticles) => {
  const { lang } = useParams();

  return (
    <div className="archive_list">
      <ul>
        {archivedArticles.map((archiveBlog, index) => {
          return (
            <li key={index}>
              <NavLink to={blogInnerPath(archiveBlog.slug, lang)}>
                <div className="archive_block">
                  <div className="news_date">
                    {dateFormat(archiveBlog.block_banner?.date)}
                  </div>
                  <div className="news_description">{archiveBlog.title}</div>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
      {/* <NavLink
                to={lang ? `/${lang}/blog` : '/blog'}
                className="view_more icon_right"
            >
                <FormattedMessage id="See more"/>
            </NavLink> */}
    </div>
  );
};

const BlogArticles = ({ blogArticles, archivedArticles, category }) => {
  const { lang } = useParams();
  const skLoading = useSelector(blogSkLoading);

  return (
    <div className="article_section">
      <div className="page_container">
        <div className="page_row">
          <div className="article_block">
            <div className="article_title">
              {skLoading ? (
                <CreateSkeleton
                  className="article_title"
                  span={false}
                  number={1}
                />
              ) : (
                <FormattedMessage
                  id={`${category ? 'Articles' : 'Read also'}`}
                />
              )}
            </div>

            {skLoading ? (
              <CreateSkeleton className="article_list" span={true} number={6} />
            ) : (
              <div className="article_list">
                <ul className="article_list_inner">
                  {
                    !!archivedArticles.length &&
                    archivedArticles.map((blog, index) => {
                      return (
                        <li key={blog.id}>
                          <NavLink
                            to={blogInnerPath(blog.slug, lang)}
                            className="news_block"
                            key={index}
                          >
                            <div className="news_image">
                              {blog.image && (
                                <img
                                  src={blog.image}
                                  width="342"
                                  height="190"
                                  alt={blog.title}
                                  title={blog.title}
                                />
                              )}
                              {blog.title}
                            </div>

                            <div className="news_info">
                              <div className="news_date">
                                {dateFormat(blog.block_banner?.date)}
                              </div>
                              {blog.tags && !!blog.tags.length && (
                                <div className="blog_category">
                                  {blog.tags.map((tag, index) => {
                                    if (tag.slug !== 'all') {
                                      return (
                                        <NavLink
                                          to={
                                            lang
                                              ? `/${lang}/blog/${tag.slug}`
                                              : `/blog/${tag.slug}`
                                          }
                                          key={index}
                                          className="category_items"
                                        >
                                          {tag.title}
                                        </NavLink>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              )}
                              <div className="news_title">{blog.title}</div>
                              <div className="news_description">
                                {blog.summary}
                              </div>
                            </div>
                          </NavLink>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
            {/* <NavLink
                            to={lang ? `/${lang}/blog` : '/blog'}
                            className="view_more icon_right"
                        >
                            {skLoading ? <CreateSkeleton className="view_more" span={false} number={1}/> :
                                <FormattedMessage id="See more"/>}

                        </NavLink> */}
            {/* <div className="paging">
                            <ul>
                                <li>
                                    <a href="" className="prev_page icon_left inactive"></a>
                                </li>
                                <li>
                                    <a href="" className="current_page">
                                        1
                                    </a>
                                </li>
                                <li>
                                    <a href="">2</a>
                                </li>
                                <li>
                                    <a href="">3</a>
                                </li>
                                <li>
                                    <span>...</span>
                                </li>
                                <li>
                                    <a href="">24</a>
                                </li>
                                <li>
                                    <a href="" className="next_page icon_right"></a>
                                </li>
                            </ul>
                        </div> */}
          </div>
          <div className="right_block">
            {skLoading ? (
              <CreateSkeleton className="iframe" span={false} number={1} />
            ) : (
              <>
                <iframe
                  title="fb-page"
                  src={settings.facebook_pixel_url}
                  height="500"
                  width={'100%'}
                  data-width={'100%'}
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export {
  BlogTagsComponent,
  BlogListing,
  BestArticlesSlide,
  BlogArticles,
  SubscribeBlog,
};
