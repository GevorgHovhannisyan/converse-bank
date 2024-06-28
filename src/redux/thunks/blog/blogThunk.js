import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiRequest} from '../../../service/service';

export const getBlogs = createAsyncThunk(
  'getBlogs',
  async ({ tag, isArchive }) => {
    const url = `/blogs`;
    const params = {};

    if (tag) {
      params.tagId = tag;
    }

    if (isArchive) {
      params.is_archive = 1;
    }

    const config = {
      method: 'get',
      url: url,
      params,
    };

    const response = await apiRequest(config);
    return {
      data: response.data,
      isTag: tag,
      isArchive: isArchive,
    };
  }
);

const getBlogsPending = (state, { payload }) => {
  state.blogs = [];
  state.skBlogLoading = true;
  // state.skCatBlogLoading = true
};

const getBlogsFulfilled = (state, { payload }) => {
  const payloadData = payload?.data;

  if (!payloadData) {
    state.skBlogLoading = false;
    state.blogs = [];
    return;
  }

  const blogArticles = payloadData.data || [];

  if (payload.isArchive) {
    state.archiveArticles = blogArticles;
  } else {
    state.skBlogLoading = false;
    state.blogs = blogArticles;
  }
};

const getBlogsRejected = (state) => {
  state.blogs = [];
};

export const getBlogsExtraReducer = (builder) => {
  builder
    .addCase(getBlogs.pending, getBlogsPending)
    .addCase(getBlogs.fulfilled, getBlogsFulfilled)
    .addCase(getBlogs.rejected, getBlogsRejected);
};

export const getBlogTags = createAsyncThunk('getBlogTags', async (category) => {
  const url = `/blog-tags`;
  const params = {};

  const config = {
    method: 'get',
    url: url,
    params,
  };

  const response = await apiRequest(config);

  return {
    data: response.data,
    category: category,
  };
});

const getBlogTagsPending = (state, { payload }) => {
  state.blogTags = [];
  state.blogTagskLoading = true;
};

const getBlogTagsFulfilled = (state, { payload }) => {
  const categories = payload.data.data;
  state.blogTags = categories;
  state.blogTagskLoading = false;
  if (payload.category) {
    state.validTag = categories.some((item) => item.slug === payload.category);
  }
};

const getBlogTagsRejected = (state) => {
  state.blogTags = [];
};

export const getBlogTagsExtraReducer = (builder) => {
  builder
    .addCase(getBlogTags.pending, getBlogTagsPending)
    .addCase(getBlogTags.fulfilled, getBlogTagsFulfilled)
    .addCase(getBlogTags.rejected, getBlogTagsRejected);
};

export const getBlog = createAsyncThunk('getBlog', async (blogId) => {
  const url = `/blog-by-slug/${blogId}`;
  // const params = {};

  const config = {
    method: 'get',
    url: url,
    // params,
  };

  const response = await apiRequest(config);

  return response.data;
});

const getBlogPending = (state, { payload }) => {
  state.blogArticle = {};
};

const getBlogFulfilled = (state, { payload }) => {
  state.blogArticle = payload.data;
};

const getBlogRejected = (state) => {
  state.blogArticle = {};
};

export const getBlogExtraReducer = (builder) => {
  builder
    .addCase(getBlog.pending, getBlogPending)
    .addCase(getBlog.fulfilled, getBlogFulfilled)
    .addCase(getBlog.rejected, getBlogRejected);
};

export const getSimilarBlogs = createAsyncThunk(
  'getSimilarBlogs',
  async (blogId) => {
    const url = `/blog/${blogId}/similar`;
    // const params = {};

    const config = {
      method: 'get',
      url: url,
      // params,
    };

    const response = await apiRequest(config);

    return response.data;
  }
);

const getSimilarBlogsPending = (state, { payload }) => {
  state.similarBlogs = [];
};

const getSimilarBlogsFulfilled = (state, { payload }) => {
  state.similarBlogs = payload.data;
};

const getSimilarBlogsRejected = (state) => {
  state.similarBlogs = [];
};

export const similarBlogsBlogExtraReducer = (builder) => {
  builder
    .addCase(getSimilarBlogs.pending, getSimilarBlogsPending)
    .addCase(getSimilarBlogs.fulfilled, getSimilarBlogsFulfilled)
    .addCase(getSimilarBlogs.rejected, getSimilarBlogsRejected);
};

export const getBlogsCategory = createAsyncThunk(
  'getBlogsCategory',
  async ({ tag, blogTags }) => {
    const url = `/blogs`;
    const params = {};
    if (tag) {
      if (blogTags.length) {
        const findTag = blogTags.find((t) => t.slug === tag);
        params.tagId = findTag.id;
      }
    }

    const config = {
      method: 'get',
      url: url,
      params,
    };

    const response = await apiRequest(config);
    return {
      data: response.data,
      tag,
    };
  }
);

const getCategoryBlogsPending = (state, { payload }) => {
  state.skCategoryBlogLoading = true;
  state.categoryBlogs = [];
};

const getCategoryBlogsFulfilled = (state, { payload }) => {
  const blogArticles = payload.data.data ? payload.data.data : payload.data;
  state.categoryBlogs = blogArticles;
  state.skCategoryBlogLoading = false;
};

const getCategoryBlogsRejected = (state) => {
  state.skCategoryBlogLoading = false;
};

export const getCategoryBlogsExtraReducer = (builder) => {
  builder
    .addCase(getBlogsCategory.pending, getCategoryBlogsPending)
    .addCase(getBlogsCategory.fulfilled, getCategoryBlogsFulfilled)
    .addCase(getBlogsCategory.rejected, getCategoryBlogsRejected);
};

export const getHomeBlogs = createAsyncThunk('getHomeBlogs', async () => {
  const url = `/blogs`;
  const params = {
    limit: 3,
    is_home: 1,
  };

  const config = {
    method: 'get',
    url: url,
    params,
  };

  const response = await apiRequest(config);

  return {
    data: response.data,
  };
});

const getHomeBlogsPending = (state, { payload }) => {
  state.skHomeBlogLoading = true;
  state.homeBlogs = [];
};

const getHomeFulfilled = (state, { payload }) => {
  const blogArticles = payload.data.data ? payload.data.data : payload.data;
  state.homeBlogs = blogArticles;
  state.skHomeBlogLoading = false;
};

const getHomeRejected = (state) => {
  state.skHomeBlogLoading = false;
};

export const getHomeBlogsExtraReducer = (builder) => {
  builder
    .addCase(getHomeBlogs.pending, getHomeBlogsPending)
    .addCase(getHomeBlogs.fulfilled, getHomeFulfilled)
    .addCase(getHomeBlogs.rejected, getHomeRejected);
};

export const getBestArticles = createAsyncThunk(
  'getBestArticles',
  async ({ page, tag }) => {
    const url = `/blogs`;
    const params = {
      page,
    };

    if (tag) {
      params.tagId = tag;
    }

    const config = {
      method: 'get',
      url: url,
      params,
    };

    const response = await apiRequest(config);

    return {
      data: response.data,
    };
  }
);

const getBestBlogsPending = (state, { payload }) => {
  // state.skHomeBlogLoading = true;
  state.bestArticles = [];
};

const getBestBlogsFulfilled = (state, { payload }) => {
  const payloadData = payload?.data;

  if (!payloadData) {
    state.bestArticles = [];
    return;
  }

  state.bestArticles = payloadData.data || [];
  // state.skHomeBlogLoading = false;
};

const getBestBlogsRejected = (state) => {
  state.skHomeBlogLoading = false;
};

export const getBestBlogsExtraReducer = (builder) => {
  builder
    .addCase(getBestArticles.pending, getBestBlogsPending)
    .addCase(getBestArticles.fulfilled, getBestBlogsFulfilled)
    .addCase(getBestArticles.rejected, getBestBlogsRejected);
};

export const getBestArticlesPaging = createAsyncThunk(
  'getBestArticlesPaging',
  async ({ page, tag }) => {
    const url = `/blogs`;
    const params = {
      page,
    };

    if (tag) {
      params.tagId = tag;
    }

    const config = {
      method: 'get',
      url: url,
      params,
    };

    const response = await apiRequest(config);

    return {
      data: response.data,
    };
  }
);

const getBestBlogsPagePending = (state, { payload }) => {
  // state.skHomeBlogLoading = true;
  // state.bestArticles = [];
};

const getBestBlogsPageFulfilled = (state, { payload }) => {
  const blogArticles = payload.data.data ? payload.data.data : payload.data;
  const stateArticles = state.bestArticles;
  const appendedBlogs = stateArticles.concat(blogArticles);
  state.bestArticles = appendedBlogs;
  // state.skHomeBlogLoading = false;
};

const getBestBlogsPageRejected = (state) => {
  // state.skHomeBlogLoading = false;
};

export const getBestBlogsPageExtraReducer = (builder) => {
  builder
    .addCase(getBestArticlesPaging.pending, getBestBlogsPagePending)
    .addCase(getBestArticlesPaging.fulfilled, getBestBlogsPageFulfilled)
    .addCase(getBestArticlesPaging.rejected, getBestBlogsPageRejected);
};
