import React from "react";
import * as SC from "./styles";
import { UsersList } from "./components/UsersList";
import { SearchInput } from "./components/SearchInput";
import { Title } from "../../components/ui/Title";
import { NavBar } from "../../components/NavBar";

export const AllPeople = () => {
  return (
    <SC.Container>
      <NavBar />
      <SC.Content>
        <Title title={"Поиск друзей"} />
        <SearchInput />
        <UsersList />
      </SC.Content>
    </SC.Container>
  );
};
