import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SC from "./styles";
import { login } from "../../../../redux/slices/authSlices";
import { v4 as uuidv4 } from "uuid";

export const AddPost = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [post, setPost] = useState("");

  const [visibility, setVisibility] = useState("");

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
				visibility: visibility,
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
		<SC.RadioInput>
            Виден только друзьям
            <input
              type="radio"
				  name="visibility"
              id="private"
              value="private"
              onChange={(e) => setVisibility(e.target.value)}
            />
            Виден всем
            <input
              type="radio"
				  name="visibility"
              value="public"
              id="public"
              onChange={(e) => setVisibility(e.target.value)}
            />
          </SC.RadioInput>
      <SC.Button onClick={addPost}>Добавить</SC.Button>
    </>
  );
};
