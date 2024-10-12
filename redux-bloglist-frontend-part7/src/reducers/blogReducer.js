import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog";
import { notifyWith } from "./notificationReducer";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { getState, requestId, rejectWithValue, dispatch }) => {
    const { currentRequestId, loading } = getState().blogs;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    try {
      const blogs = await blogService.getAll();
      return blogs;
    } catch (error) {
      dispatch(notifyWith(error.message, "error"));
      return rejectWithValue(error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlogs",
  async (blogObject, { dispatch, rejectWithValue }) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(
        notifyWith(
          `a new blog '${blogObject.title}' by '${blogObject.author}' has been added`
        )
      );
      return newBlog;
    } catch (error) {
      dispatch(notifyWith(error.message, "error"));
      return rejectWithValue(error.message);
    }
  }
);

export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (id, { dispatch, getState }) => {
    const { data: blogs } = getState().blogs;

    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    };

    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      return returnedBlog;
    } catch (error) {
      dispatch(notifyWith(error.message, "error"));
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { dispatch }) => {
    try {
      await blogService.deleteItem(id);
      return id;
    } catch (exception) {
      dispatch(notifyWith(exception.response.data.error, "error"));
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    data: [],
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.data = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(createBlog.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.data.push(action.payload);
          state.currentRequestId = undefined;
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(likeBlog.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = undefined;

          const updatedBlog = action.payload;
          state.data = state.data.map((blog) =>
            blog.id === updatedBlog.id ? updatedBlog : blog
          );
        }
      })
      .addCase(likeBlog.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(deleteBlog.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = undefined;

          const id = action.payload;
          state.data = state.data.filter((blog) => blog.id !== id);
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.payload;
          state.currentRequestId = undefined;
        }
      });
  },
});

export default blogSlice.reducer;
