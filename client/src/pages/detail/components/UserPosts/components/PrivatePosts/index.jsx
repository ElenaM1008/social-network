import React from "react";
import * as SC from "./styles";
import { useSelector } from "react-redux";

export const PrivatePosts = ({
	deletePost,
	comment,
	setComment,
	addComment,
 }) => {

  const { data } = useSelector((state) => state.detail);
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <>
      {data.posts.map((post) => (
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
            <SC.Button onClick={() => addComment(post.id)}>Отправить</SC.Button>
          </SC.TextareaAndBut>
        </div>
      ))}
    </>
  );
};
