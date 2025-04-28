// api/blogs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axiosInstance";
import { toast } from "sonner";




// import { Blog, BlogFormData, BlogApiData, ApiResponse } from "../components/types";

import { Blog,BlogByAuthor,BlogFormData, ApiResponse,BlogByAuthorResponse,AllBlogResponse} from "../components/types"




export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, Error, BlogFormData>({
    mutationFn: async (blogData) => {
      const res = await api.post("/posts/create", {...blogData ,category_id:Number(blogData.category_id)});
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Blog created successfully");
      queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create blog");
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, Error, { id: string; blog: BlogFormData }>({
    mutationFn: async ({ id, blog }) => {
      const res = await api.patch(`posts/edit/${id}`, {...blog,category_id:Number(blog.category_id)});
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Blog updated successfully");
      queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update blog");
    },
  });
};


export const useGetAllBlogs = () => {
  return useQuery<Blog[]>({ // Adjust according to your actual API response
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await api.get<AllBlogResponse>("/posts/list");
      return res.data.results.data;
    },
  });
};


export const useGetMyBlogs = () => {
  return useQuery<BlogByAuthor[], Error>({
    queryKey: ["myBlogs"],
    queryFn: async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) throw new Error("Please login to view your blogs");
        
        const user = JSON.parse(userString);
        if (!user?.id) throw new Error("User information is incomplete");

        const res = await api.get<BlogByAuthorResponse>(`/posts/author/${user.id}`);
        console.log(res)
        return res.data?.results.data|| [];
      } catch (error) {
        console.error("Error fetching blogs:", error);
        throw new Error("Failed to load your blogs");
      }
    },
    retry: 1,
    enabled: !!localStorage.getItem("user"),
  });
};



// Delete hook remains the same


export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`posts/delete/${id}`);
    },
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete blog");
    },
  });
};


interface Category {
  cid: number;
  cname: string;
  // Add other properties as needed
}

export const useCategories = () => {
  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24; // 24 hours
  
  return useQuery<Category[]>({
    queryKey: ['categories'], // Unique query key
    queryFn: async () => {
      const response = await api.get('/category/list');
      console.log(response)
      return response.data.results.data;
    },
    staleTime: ONE_DAY_IN_MS, // Data stays fresh for 24 hours
    retry: 2, // Retry failed requests twice
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};






//old code

// api/blogs.ts
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "./axiosInstance";
// import { toast } from "sonner";




// import { Blog, BlogFormData, BlogApiData, ApiResponse } from "../components/types";

// export const useCreateBlog = () => {
//   const queryClient = useQueryClient();
//   return useMutation<ApiResponse, Error, BlogApiData>({
//     mutationFn: async (blogData) => {
//       const res = await api.post<ApiResponse>("/posts/create", blogData);
//       return res.data;
//     },
//     onSuccess: (data) => {
//       toast.success(data.message || "Blog created successfully");
//       queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to create blog");
//     },
//   });
// };

// export const useUpdateBlog = () => {
//   const queryClient = useQueryClient();
//   return useMutation<ApiResponse, Error, { id: string; blog: BlogApiData }>({
//     mutationFn: async ({ id, blog }) => {
//       const res = await api.patch<ApiResponse>(`posts/edit/${id}`, blog);
//       return res.data;
//     },
//     onSuccess: (data) => {
//       toast.success(data.message || "Blog updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to update blog");
//     },
//   });
// };


// export const useGetAllBlogs = () => {
//   return useQuery<{ results: { data: Blog[] } }>({ // Adjust according to your actual API response
//     queryKey: ["blogs"],
//     queryFn: async () => {
//       const res = await api.get("/posts/list");
//       return res.data;
//     },
//   });
// };


// export const useGetMyBlogs = () => {
//   return useQuery<Blog[], Error>({
//     queryKey: ["myBlogs"],
//     queryFn: async () => {
//       try {
//         const userString = localStorage.getItem("user");
//         if (!userString) throw new Error("Please login to view your blogs");
        
//         const user = JSON.parse(userString);
//         if (!user?.id) throw new Error("User information is incomplete");

//         const res = await api.get<{ data: Blog[] }>(`/posts/author/${user.id}`);
//         console.log(res)
//         return res.data?.results.data|| [];
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//         throw new Error("Failed to load your blogs");
//       }
//     },
//     retry: 1,
//     enabled: !!localStorage.getItem("user"),
//   });
// };



// // Delete hook remains the same


// export const useDeleteBlog = () => {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, string>({
//     mutationFn: async (id) => {
//       await api.delete(`posts/delete/${id}`);
//     },
//     onSuccess: () => {
//       toast.success("Blog deleted successfully");
//       queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to delete blog");
//     },
//   });
// };