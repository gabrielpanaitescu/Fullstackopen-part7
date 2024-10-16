import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNotify } from "../contexts/NotificationContext";
import blogService from "../services/blog";

export const useBlogApi = () => {
  const queryClient = useQueryClient();
  const notifyWith = useNotify();

  const invalidateBlogs = () => {
    queryClient.invalidateQueries({ queryKey: ["Blog"] });
  };

  const getBlogs = useQuery({
    queryKey: ["Blog"],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.log(error);
      notifyWith(`Failed to fetch blogs ${error.message}`, "error");
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      invalidateBlogs();
    },
    onError: (error) => {
      console.log(error);
      notifyWith(`Failed to add blog ${error.message}`, "error");
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (returnedBlog) => {
      const blogs = queryClient.getQueryData(["Blog"]);
      queryClient.setQueryData(
        ["Blog"],
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      );
    },
    onError: (error) => {
      console.log(error);
      notifyWith(`Failed to add blog ${error.message}`, "error");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteItem,
    onSuccess: () => {
      invalidateBlogs();
    },
    onError: (error) => {
      console.log(error);
      notifyWith(`Failed to delete blog ${error.message}`, "error");
    },
  });

  return {
    blogs: getBlogs.data || [],
    isGetBlogsPending: getBlogs.isPending,
    isGetBlogsError: getBlogs.isError,
    getBlogsError: getBlogs.error,
    createBlogMutation,
    updateBlogMutation,
    deleteBlogMutation,
  };
};
