import React, { useState } from "react";
import * as SC from "./styles";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import { PublicPosts } from "./components/PublicPosts";
import { PrivatePosts } from "./components/PrivatePosts";
import { FetchData } from "../../../../components/FetchData";

export const UserPosts = () => {
  const { data } = useSelector((state) => state.detail);
  const { currentUser } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");

  const isItMyFriend = data.friends.includes(currentUser._id);

  const { fetchData } = FetchData();

  const deletePost = async (id) => {
    await fetchData({
      postId: id,
      url: `http://localhost:3003/api/users/${data._id}/delete`,
      method: "delete",
      cb: getUserInfo,
    });
  };

  const addComment = async (id) => {
    await fetchData({
      content: comment,
      author: currentUser.name,
      postId: id,
      url: `http://localhost:3003/api/users/${data._id}/comment/add`,
      method: "post",
      cb: getUserInfo,
    });
    setComment("");
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
