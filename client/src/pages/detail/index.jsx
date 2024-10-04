import React from "react";
import * as SC from "./styles";
import { useSelector } from "react-redux";
import { Title } from "../../components/ui/Title";
import { UserInfo } from "./components/UserInfo";
import { UserPosts } from "./components/UserPosts";
import { NavBar } from "../../components/NavBar";

export const DetailUser = () => {
  const { data } = useSelector((state) => state.detail);

  return (
    <SC.Container>
      <NavBar />
      <SC.Content>
        <Title title={`Информация о ${data.name} ${data.surname}`} />
        <UserInfo />
        <Title title={"Посты"} />
        <UserPosts />
      </SC.Content>
    </SC.Container>
  );
};
