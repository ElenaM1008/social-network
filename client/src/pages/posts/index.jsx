import React from "react";
import * as SC from "./styles";
import { Title } from "../../components/ui/Title";
import { AddPost } from "./components/AddPost";
import { AddComments } from "./components/AddComments";

export const PostsPage = () => {
  return (
    <SC.Posts>
      <Title title={"Мои посты"} />
      <AddPost />
      <AddComments />
    </SC.Posts>
  );
};
