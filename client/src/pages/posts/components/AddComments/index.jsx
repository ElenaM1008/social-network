import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as SC from "./styles";
import { login } from "../../../../redux/slices/authSlices";
import { FetchData } from "../../../../components/FetchData";

export const AddComments = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");

  const postsLength = currentUser.posts.length;

  const { fetchData } = FetchData();

  const deletePost = async (id) => {
    await fetchData({
      postId: id,
      url: `http://localhost:3003/api/users/${currentUser._id}/delete`,
      method: "delete",
      cb: login,
    });
  };

  const addComment = async (id) => {
    await fetchData({
      content: comment,
      author: currentUser.name,
      postId: id,
      url: `http://localhost:3003/api/users/${currentUser._id}/comment/add`,
      method: "post",
      cb: login,
    });
    setComment("");
  };

  return (
    <>
      {postsLength <= 0 ? (
        <p>У вас пока нет постов</p>
      ) : (
        currentUser.posts.map((post) => (
          <div key={post.id}>
            <SC.ContentPost>
              <SC.PostText>{post.text}</SC.PostText>
              <SC.DeleteIcon onClick={() => deletePost(post.id)}>
                x
              </SC.DeleteIcon>
            </SC.ContentPost>
            <SC.ContentComments>
              <b>Комментарии:</b>
              {currentUser.comments.map((comment, index) =>
                post.id === comment.postId ? (
                  <SC.CommentText key={index}>
                    <SC.Autor>{comment.author}</SC.Autor>
                    <span>{comment.content}</span>
                  </SC.CommentText>
                ) : (
                  ""
                )
              )}
            </SC.ContentComments>
            <SC.TextareaAndBut>
              <SC.Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментировать пост"
              />
              <SC.Button onClick={() => addComment(post.id)}>
                Отправить
              </SC.Button>
            </SC.TextareaAndBut>
          </div>
        ))
      )}
    </>
  );
};
