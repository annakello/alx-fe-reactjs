import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-xl font-bold">Blog Post {id}</h2>
      <p>This is content for blog post with ID: {id}</p>
    </div>
  );
}
