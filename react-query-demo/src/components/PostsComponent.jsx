import { useQuery } from "@tanstack/react-query";

// API function
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function PostsComponent() {
  const {
    data: posts,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5000,              // data stays fresh for 5s
    cacheTime: 1000 * 60 * 5,     // ✅ keep cache for 5 minutes
    refetchOnWindowFocus: false,  // avoid auto refetch on tab switch
    keepPreviousData: true,       // ✅ keep old data while fetching new
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4 w-[600px] space-y-4 border rounded shadow">
      <h2 className="text-xl font-bold flex justify-between items-center">
        Posts
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </h2>

      <ul className="space-y-2">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className="p-2 border-b">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
