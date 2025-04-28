import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";

const Feed = ({ post }: { post: any }) => {
  // Function to format date correctly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white mb-4 max-w-4xl mx-auto">
      {/* No image in data, use placeholder */}


      <div className="p-4">
        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={`https://i.pravatar.cc/100?u=${post.author?.id || 'user'}`}
            alt="Author"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">
              {post.author?.name || "Unknown Author"}
            </p>
            <p className="text-xs text-gray-500">
              {post.created_at ? formatDate(post.created_at) : "Some time ago"}
            </p>
          </div>
        </div>

        {/* Category */}
        {post.category?.name && (
          <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
            {post.category.name}
          </div>
        )}

        {/* Title & Description */}
        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {post.description || "No description available."}
        </p>

        {/* Read More
        <a
          href={`/posts/${post.id}`}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Read more →
        </a> */}
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-4 pt-2 flex justify-between text-gray-500 text-sm">
        <button className="flex items-center gap-1 hover:text-red-500">
          <FaHeart /> {post.likes || 0}
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500">
          <FaRegComment /> {post.comments || 0}
        </button>
        <button className="flex items-center gap-1 hover:text-green-500">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default Feed;
