import React, { useState } from "react";
import * as SC from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";

export const UserPosts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.detail);
  const { currentUser } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");

  const deletePost = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/${data._id}/delete`,
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: id,
          }),
        }
      );
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(getUserInfo(json));
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/${data._id}/comment/add`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            autor: currentUser.name,
            postId: id,
          }),
        }
      );
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(getUserInfo(json));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <SC.Posts>
        {data.posts &&
          data.posts.map((post) => (
            <div key={post.id}>
              <SC.ContentPost>
                {currentUser.userType === "admin" ? (
                  <SC.DeleteIcon onClick={() => deletePost(post.id)}>
                    x
                  </SC.DeleteIcon>
                ) : null}
                <SC.PostText>{post.text}</SC.PostText>
              </SC.ContentPost>
              <SC.ContentComments>
                <b>Комментарии:</b>
                {data.comments.map((comment, index) =>
                  post.id === comment.postId ? (
                    <SC.CommentText key={index}>
                      <SC.Autor>{comment.autor}</SC.Autor>
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
          ))}
      </SC.Posts>
  );
};