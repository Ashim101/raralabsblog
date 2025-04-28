// src/pages/MyBlogs.tsx
import { useState } from "react";
import { useGetMyBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from "../api/blogs";
import BlogForm from "../components/forms/BlogForm";
import { useNavigate } from "react-router-dom";
import { Blog, BlogByAuthor, BlogFormData } from "../components/types";

const MyBlogs = () => {
  const navigate = useNavigate();
  const { data: blogs, isLoading, error, refetch } = useGetMyBlogs();
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogByAuthor | null>(null);

  const handleCreate = (formData: BlogFormData) => {
    const apiData = {
      title: formData.title,
      description: formData.description,
      category_id: formData.category_id
    };
    
    createBlog.mutate(apiData, {
      onSuccess: () => {
        setShowForm(false);
        refetch();
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  const handleUpdate = (id: string, formData: BlogFormData) => {
    const apiData = {
      title: formData.title,
      description: formData.description,
      category_id: formData.category_id
    };
    
    updateBlog.mutate({ id: id, blog: apiData }, {
      onSuccess: () => {
        setShowForm(false);
        refetch();
      },
      onError: (error) => {
        console.error(error.message || "Failed to update blog");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      console.log(id);
      deleteBlog.mutate(id, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error(error);
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="text-center mt-10">Loading your blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="text-center mt-10 text-red-500">
          Error: {error.message}
          <button 
            onClick={() => refetch()}
            className="ml-4 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Blogs</h1>
          <button 
            onClick={() => {
              setEditingBlog(null);
              setShowForm(prev => !prev);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? "Cancel" : "Create New Blog"}
          </button>
        </div>

        {showForm && (
          <BlogForm 
            initialValues={editingBlog ? {
              title: editingBlog.title,
              description: editingBlog.description,
              category_id: editingBlog.category.id
            } : undefined}
            onSubmit={editingBlog ? 
              (data) => handleUpdate(editingBlog.id, data) : 
              handleCreate}
            isPending={createBlog.isPending || updateBlog.isPending}
          />
        )}

        <div className="space-y-6">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-700 line-clamp-3">{blog.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Category: {blog.category.name}
                  </span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditingBlog(blog);
                        setShowForm(true);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">You haven't created any blogs yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Create Your First Blog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;