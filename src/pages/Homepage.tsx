import { useGetAllBlogs } from "../api/blogs";
import Navbar from "../components/Navbar";
import Feed from "../components/NewsCard";

const Homepage = () => {
  const { data, isLoading, error } = useGetAllBlogs();

  if (isLoading) {
    return (
      <div className="">
        <Navbar />
        <hr />
        <div className="p-4">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="">
        <Navbar />
        <hr />
        <div className="p-4 text-red-500">Error loading posts</div>
      </div>
    );
  }

  // Safely access posts data with proper type checking
  const posts = data

  return (
    <div className="">
      <hr />

      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <Feed key={post.id } post={post} />
        ))
      ) : (
        <div className="p-4">No posts available</div>
      )}
    </div>
  );
};

export default Homepage;