import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPages = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const params = useParams();

  const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComentsLoading, commError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostId(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostsById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>You opened a post page with ID = {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      {isComentsLoading ? (
        <Loader />
      ) : (
        comments.map((comment) => (
          <div key={comment.id} style={{ marginTop: 15 }}>
            <h5>{comment.email}</h5>
            <div>{comment.body}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostIdPages;
