import React, { useState } from "react";
import * as SC from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import { PublicPosts } from "./components/PublicPosts";
import { PrivatePosts } from "./components/PrivatePosts";

export const UserPosts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.detail);
  const { currentUser } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");

  const isItMyFriend = data.friends.includes(currentUser._id);

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

      dispatch(getUserInfo(json));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SC.Posts>
      {isItMyFriend ? (
        <PrivatePosts
          comment={comment}
          setComment={setComment}
          deletePost={deletePost}
          addComment={addComment}
        />
      ) : (
        <PublicPosts
          comment={comment}
          setComment={setComment}
          deletePost={deletePost}
          addComment={addComment}
        />
      )}
    </SC.Posts>
  );
};
