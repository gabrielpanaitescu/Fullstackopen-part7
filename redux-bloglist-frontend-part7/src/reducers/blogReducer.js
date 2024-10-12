import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blog";
import { notifyWith } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
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
});

export default blogSlice.reducer;
const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();

  dispatch(setBlogs(blogs));
};

export const createBlog = (blogObject) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blogObject);
    dispatch(
      notifyWith(
        `a new blog '${blogObject.title}' by '${blogObject.author}' has been added`
      )
    );
    dispatch(addBlog(newBlog));
  } catch (exception) {
    dispatch(notifyWith(exception.response.data.error, "error"));
  }
};

export const likeBlog = (id) => async (dispatch, getState) => {
  const { blogs } = getState();
  const blogToUpdate = blogs.find((blog) => blog.id === id);
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
    user: blogToUpdate.user.id,
  };

  try {
    const returnedBlog = await blogService.update(id, updatedBlog);
    dispatch(updateBlog(returnedBlog));
  } catch (exception) {
    dispatch(notifyWith(exception.response.data.error, "error"));
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.deleteItem(id);
    dispatch(removeBlog(id));
  } catch (exception) {
    dispatch(notifyWith(exception.response.data.error, "error"));
  }
};
