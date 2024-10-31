import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as SC from "./styles";
import { login } from "../../../../redux/slices/authSlices";
import { v4 as uuidv4 } from "uuid";
import { FetchData } from "../../../../components/FetchData";

export const AddPost = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const [post, setPost] = useState("");
  const [visibility, setVisibility] = useState("");

  const { fetchData } = FetchData();

  const addPost = async () => {
    await fetchData({
      text: post,
      owner: currentUser._id,
      id: uuidv4(),
      visibility: visibility,
      url: `http://localhost:3003/api/users/${currentUser._id}/add`,
      method: "post",
      cb: login,
    });
    setPost("");
  };

  return (
    <>
      <SC.Textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Что у вас нового?"
      />
      <SC.RadioInput>
        <SC.RadioLabel>
          Виден только друзьям
          <input
            type="radio"
            name="visibility"
            id="private"
            value="private"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </SC.RadioLabel>
        <SC.RadioLabel>
          Виден всем
          <input
            type="radio"
            name="visibility"
            value="public"
            id="public"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </SC.RadioLabel>
      </SC.RadioInput>
      <SC.Button onClick={addPost}>Добавить</SC.Button>
    </>
  );
};
