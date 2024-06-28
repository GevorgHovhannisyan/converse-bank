import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlog, getSimilarBlogs } from '../../../redux/thunks/blog/blogThunk';
import {
  blogArticleSelector,
  blogSkLoading,
  similarArticlesSelector,
} from '../../../redux/slices/blog/blog';

import './blogInner.scss';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  // PinterestShareButton,
  LinkedinShareButton,
  TwitterIcon,
  // PinterestIcon,
  LinkedinIcon,
} from 'react-share';

import { HelmetComponent } from '../../../components/controls/helmet/Helmet';
import moment from 'moment';
import SimilarBlogComponent from '../components/similarBlog';
const dateFormat = (date) => {
  return moment(date).format('DD.MM.YYYY');
};
const BlogInner = () => {
  const params = useParams();
  // const location = useLocation();
  // let socials_item = useSelector(socialsList);
  const dispatch = useDispatch();
  const [pageMeta, setMeta] = useState({});
  const { lang, slugOfBlog } = params;
  const skLoading = useSelector(blogSkLoading);
  const blogArticle = useSelector(blogArticleSelector);
  const similarArticles = useSelector(similarArticlesSelector);
  useEffect(() => {
    dispatch(getBlog(slugOfBlog));
  }, [slugOfBlog, lang, dispatch]);

  useEffect(() => {
    bindMetaInfo(blogArticle);
    if (blogArticle.id) {
      dispatch(getSimilarBlogs(blogArticle.id));
    }
  }, [blogArticle, dispatch]);
  const bindMetaInfo = (article) => {
    const metaInfo = {
      title: article.title,
      meta_description: article.slug,
      image: article.image,
    };
    setMeta(metaInfo);
  };

  return (
    <div className="blog_inner">
      <HelmetComponent pageData={pageMeta} />

      <>
        {skLoading ? (
          <div className="inner_skeleton">
            <div className="page_container">
              <span className="slide_title"></span>
              <span className="slide_description"></span>
              <span className="slide_btn"></span>
            </div>
          </div>
        ) : (
          <div className="blog_banner_block">
            <div className="inner_img">
              {blogArticle.block_banner && blogArticle.block_banner.image && (
                <picture>
                  <source
                    media="(max-width: 1024px)"
                    srcSet={blogArticle.block_banner.mobile_image}
                  />
                  <img
                    src={blogArticle.block_banner.image}
                    alt={blogArticle.title}
                    title={blogArticle.title}
                    width={1920}
                    height={540}
                  />
                </picture>
              )}
            </div>
            <div className="banner_inner">
              <div className="page_container">
                <div className="blog_banner_info">
                  <h1 className="page_title">
                    {blogArticle.block_banner && blogArticle.block_banner.title}
                  </h1>
                  <div className="info_inner">
                    <div className="date">
                      {dateFormat(blogArticle.block_banner?.date)}
                    </div>
                    <div className="tags_list_inner">
                      <ul>
                        {blogArticle.tags &&
                          blogArticle.tags.length &&
                          blogArticle.tags.map((tag, index) => {
                            return <li key={index}>{tag.title}</li>;
                          })}
                      </ul>
                    </div>
                    <div className="share_btns">
                      <FacebookShareButton url={window.location}>
                        <FacebookIcon size={48} bgStyle={{fill: 'none'}}/>
                      </FacebookShareButton>

                      <TwitterShareButton url={window.location}>
                        <TwitterIcon size={48} bgStyle={{fill: 'none'}} />
                      </TwitterShareButton>

                      <LinkedinShareButton url={window.location}>
                        <LinkedinIcon size={48} bgStyle={{fill: 'none'}} />
                      </LinkedinShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      {blogArticle.block_banner && blogArticle.block_banner && (
        <div className="page_container">
          <div
            className="blog_article_inner"
            dangerouslySetInnerHTML={{ __html: blogArticle.block_banner.body }}
          ></div>
        </div>
      )}

      {!!similarArticles.length && (
        <div className="similar_news">
          <SimilarBlogComponent similarArticles={similarArticles} />
        </div>
      )}
    </div>
  );
};

export default BlogInner;
