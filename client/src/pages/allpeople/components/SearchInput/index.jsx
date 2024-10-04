import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, findAllUser } from "../../../../redux/slices/findUsersSlice";
import * as SC from "./styles";

export const SearchInput = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { filter } = useSelector((state) => state.findUser);

  const [search, setSearch] = useState(filter.search || "");

  useEffect(() => {
    dispatch(findAllUser({ login: currentUser.login, search }));
    dispatch(changeSearch(search));
  }, [search, currentUser, dispatch]);

  return (
    <SC.SearchInput
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      placeholder="Поиск"
    />
  );
};