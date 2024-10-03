import React from "react";
import * as SC from "./styles";
import { UsersList } from "./components/UsersList";
import { SearchInput } from "./components/SearchInput";
import { Title } from "../../components/ui/Title";

export const AllPeople = () => {
  return (
    <SC.Container>
      <Title title={'Поиск друзей'}/>
      <SearchInput />
      <UsersList />
    </SC.Container>
  );
};