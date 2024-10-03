import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SC from "./styles";
import { login } from "../../../../redux/slices/authSlices";
import { v4 as uuidv4 } from "uuid";

export const AddPost = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [post, setPost] = useState("");

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

  return (
    <>
      <SC.Textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Что у вас нового?"
      />
      <SC.Button onClick={addPost}>Добавить</SC.Button>
    </>
  );
};
