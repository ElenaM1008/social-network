import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SC from "./styles";
import { login } from "../../../../redux/slices/authSlices";

export const AddComments = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const deletePost = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/${currentUser._id}/delete`,
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

      dispatch(login(json));
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/${currentUser._id}/comment/add`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            author: currentUser.name,
            postId: id,
          }),
        }
      );
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(login(json));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <>
          { currentUser.posts.length <=0 ? <p>У вас пока нет постов</p>
			 :
			 currentUser.posts.map((post) => (
            <div key={post.id}>
					<SC.ContentPost>
              <SC.PostText>{post.text}</SC.PostText>
				  <SC.DeleteIcon onClick={() => deletePost(post.id)}>x</SC.DeleteIcon>
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
          ))}
        </>
  );
};
