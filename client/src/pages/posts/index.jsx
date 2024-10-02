import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SC from "./styles";
import { login } from "../../redux/slices/authSlices";
import { v4 as uuidv4 } from "uuid";

export const PostsPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");

  const addPost = async () => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/${currentUser._id}/add`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: post,
            owner: currentUser._id,
            id: uuidv4(),
          }),
        }
      );
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(login(json));
      setPost("");
    } catch (error) {
      console.log(error);
    }
  };

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

      dispatch(login(json));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SC.Posts>
      <SC.Title>Мои посты</SC.Title>
      <SC.Textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Что у вас нового?"
      />
      <SC.Button onClick={addPost}>Добавить</SC.Button>
        <div>
          {currentUser.posts.map((post) => (
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
        </div>
    </SC.Posts>
  );
};
