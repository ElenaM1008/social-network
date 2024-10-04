import React from "react";
import * as SC from "./styles";
import { PostsPage } from "../posts";
import { NavBar } from '../../components/NavBar'
import { Title } from "../../components/ui/Title";
import { UserInfo } from "./components/UserInfo";

export const MyProfile = () => {
  return (
    <SC.Container>
      <NavBar />
      <SC.Content>
        <Title title={"Информация обо мне"} />
        <UserInfo />
        <PostsPage />
      </SC.Content>
    </SC.Container>
  );
};
