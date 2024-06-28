import { createSlice } from '@reduxjs/toolkit';
import {
  getBlogsExtraReducer,
  getBlogTagsExtraReducer,
  getBestBlogsExtraReducer,
  getHomeBlogsExtraReducer,
  getBlogExtraReducer,
  similarBlogsBlogExtraReducer,
  getCategoryBlogsExtraReducer,
  getBestBlogsPageExtraReducer
} from '../../thunks/blog/blogThunk';

const initialState = {
  blogs: [],
  blogTags: [],
  bestArticles: [],
  bestArticleMeta: {},
  similarBlogs: [],
  categoryBlogs: [],
  homeBlogs: [],
  blogArticle: {},
  archiveArticles: [],
  skBlogLoading: false,
  blogTagskLoading: false,
  skCategoryBlogLoading: false,
  skHomeBlogLoading: false,
  validTag: true,

  blogPage: 1
};

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCategoryBlogs: (state, { payload }) => {
      state.categoryBlogs = payload;
    },
    setPageBlogs: (state, { payload }) => {
      state.blogPage = payload;
    },
  },
  extraReducers: (builder) => {
    getBlogsExtraReducer(builder);
    getBlogTagsExtraReducer(builder);
    getBlogExtraReducer(builder);
    similarBlogsBlogExtraReducer(builder);
    getCategoryBlogsExtraReducer(builder);
    getHomeBlogsExtraReducer(builder);
    getBestBlogsExtraReducer(builder);
    getBestBlogsPageExtraReducer(builder);
  },
});

export const blogsSelector = (state) => state.blog.blogs;
export const blogTagSelector = (state) => state.blog.blogTags;
export const bestArticlesSelector = (state) => state.blog.bestArticles;
export const bestArticleMetaSelector = (state) => state.blog.bestArticleMeta;

export const similarArticlesSelector = (state) => state.blog.similarBlogs;
export const blogArticleSelector = (state) => state.blog.blogArticle;
export const archivedArticlesSelector = (state) => state.blog.archiveArticles;
export const categoryBlogsSelector = (state) => state.blog.categoryBlogs;
export const validTagSelector = (state) => state.blog.validTag;

export const blogSkLoading = (state) => state.blog.skBlogLoading;
export const blogTagskLoadingSelector = (state) => state.blog.blogTagskLoading;
export const skCategoryBlogLoading = (state) =>
  state.blog.skCategoryBlogLoading;
export const skHomeBlogLoading = (state) => state.blog.skHomeBlogLoading;
export const homeBlogs = (state) => state.blog.homeBlogs;


export const blogPage = (state) => state.blog.blogPage;

export const { setCategoryBlogs, setPageBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;
