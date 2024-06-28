import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  /* useNavigate, useLocation, */ Outlet,
  useLocation,
  // use,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MainLayout } from '../../layouts/MainLayout';
import NotFound from '../error-page';
import {
  blogsSelector,
  blogTagSelector,
  bestArticlesSelector,
  archivedArticlesSelector,
  blogTagskLoadingSelector,
  validTag,
  validTagSelector,
  blogPage,
  setPageBlogs,
} from '../../redux/slices/blog/blog';
import {
  getBlogs,
  getBlogTags,
  getBestArticlesPaging,
  getBestArticles,
} from '../../redux/thunks/blog/blogThunk';
import {
  BlogTagsComponent,
  BlogListing,
  BestArticlesSlide,
  BlogArticles,
  SubscribeBlog,
} from './components/blogTagsComponent';
import { getBlogTitle } from './utils';
// import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './blog.scss';
import CreateSkeleton from '../../components/hoc/skeleton';
import Breadcrumbs from '../../components/controls/breadcrumb/breadcrumb';
import {
  blogSkLoading,
  skCategoryBlogLoading,
} from '../../redux/slices/blog/blog';

import settings from '../../settings/settings.json';
import {getRouteBlog} from "../../constants/router";
/* eslint-disable */
const Blog = () => {
  const dispatch = useDispatch();
  const [breadcrumbRoutes, setRoutes] = useState([]);

  const [lastPage, setLastPage] = useState();
  const { pathname } = useLocation();
  const { category, slugOfBlog, lang } = useParams();
  const blogs = useSelector(blogsSelector);
  const blogTags = useSelector(blogTagSelector);
  const page = useSelector(blogPage);

  const bestArticles = useSelector(bestArticlesSelector);
  const archivedArticles = useSelector(archivedArticlesSelector);
  // const skBlogLoading = useSelector(blogSkLoading);
  const skCatBlogLoading = useSelector(skCategoryBlogLoading);
  const blogTagskLoading = useSelector(blogTagskLoadingSelector);
  const validTag = useSelector(validTagSelector);

  const setMetaLastPage = payload => {
    const payloadData = payload?.data;

    if (!payloadData) return;

    const meta = payloadData.meta;

    if (meta.hasOwnProperty('last_page')) {
      setLastPage(meta.last_page);
    }
  }

  const getBestArticlesHandler = (page, tag) => {
    if (page > 1) {
      dispatch(getBestArticlesPaging({ page, tag }))
        .then(({ payload }) => setMetaLastPage(payload));
    } else {
      dispatch(getBestArticles({ page, tag }))
        .then(({ payload }) => setMetaLastPage(payload));
    }
  }

  useEffect(() => {
    dispatch(setPageBlogs(1));

    dispatch(getBlogTags(category)).then(({ payload }) => {
      const categories = payload.data.data;
      let tagId = null;
      if (category) {
        const getTag = categories.find((tag) => tag.slug === category);
        if (getTag) {
          tagId = getTag.id;
        }
      }

      dispatch(getBlogs({ tag: tagId }));

      getBestArticlesHandler(1, tagId);

      dispatch(getBlogs({ isArchive: true, tag: tagId }));
    });
  }, [dispatch, lang, category]);

  useEffect(() => {
    if (slugOfBlog) {
      const blogTitle = <FormattedMessage id="Blog" />;

      setRoutes([
        {
          name: blogTitle,
          url: lang ? `/${lang}/${getRouteBlog()}` : `/${getRouteBlog()}`,
        },
      ]);
    }
  }, [blogTags.length, slugOfBlog, blogTags, dispatch, lang]);

  const title = getBlogTitle({ category: category, blogTags });

  if (!validTag) {
    return (
      <MainLayout noFooter={true}>
        <NotFound />
      </MainLayout>
    );
  }

  const changePage = () => {
    let tagId = null;
    if (category) {
      const getTag = blogTags.find((tag) => tag.slug === category);
      if (getTag) {
        tagId = getTag.id;
      }
    }

    getBestArticlesHandler(page + 1, tagId);

    dispatch(setPageBlogs(page + 1));
  };

  const handleResize = () => {
  };

  useEffect(() => {
    const delay = 10; // adjust delay as needed
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, delay);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return (
    <MainLayout>
      <Helmet>
        <title>{settings.website_title}</title>
        <meta property="og:title" content={settings.website_title} />
        <meta name="description" content={settings.website_description} />
        {/* <meta name="facebook-domain-verification" content={FB_VERIFY_CODE} /> */}
        <meta name="keywords" content="" />
        <meta
          property="og:description"
          content={settings.website_description}
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:title" content={settings.website_title} />
        <meta
          name="twitter:description"
          content={settings.website_description}
        />
        <meta name="twitter:url" content={window.location.href} />
        {/* <meta property="og:image" content={helments_list.image ? !(helments_list.image.path.indexOf("http://") === 0 || helments_list.image.path.indexOf("https://") === 0) ? `${window.location.origin}/image/${helments_list.image.path}` : helments_list.image.path : `${window.location.origin}/storage/img-not-found.png`} /> */}
      </Helmet>

      <div className={`blog_page ${slugOfBlog ? 'blog_inner_page' : ''}`}>
        <div className="blog_home">
          {/* {`blog_${category ? 'listing' : 'home'}`} */}
          <div className="blog_home_section">
            <div className="page_container">
              {slugOfBlog && <Breadcrumbs routes={breadcrumbRoutes} />}

              {!blogTagskLoading ? (
                <>{<BlogTagsComponent blogTags={blogTags} />}</>
              ) : (
                <CreateSkeleton className="tags_list" span={false} number={3} />
              )}
              {!slugOfBlog && (
                <>
                  {!skCatBlogLoading ? (
                    <>{<h1 className="page_title">{title}</h1>}</>
                  ) : (
                    <>
                      <CreateSkeleton
                        className="page_title"
                        span={false}
                        number={1}
                      />
                    </>
                  )}
                  <BlogListing blogs={blogs} />
                  {/* category ? categoryBlogs : */}
                </>
              )}
            </div>
          </div>
          {slugOfBlog && <Outlet />}
          {!slugOfBlog && bestArticles && !!bestArticles.length && (
            <BestArticlesSlide
              page={page}
              lastPage={lastPage}
              bestArticles={bestArticles}
              handleLoadMore={changePage}
            />
          )}
          {!slugOfBlog ? (
            <>
              <BlogArticles
                archivedArticles={archivedArticles}
                category={category}
                blogArticles={blogs}
              />
              <SubscribeBlog />
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
