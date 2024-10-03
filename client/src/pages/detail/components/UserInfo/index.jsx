import React from "react";
import * as SC from "./styles";
import { useSelector } from "react-redux";

export const UserInfo = () => {
  const { data } = useSelector((state) => state.detail);

  return (
    <SC.InfoUser>
      <p>Город:{data.city}</p>
      <p>Дата рождения:{data.birthday}</p>
      <p>Пол:{data.gender}</p>
      <p>Номер телефона:{data.phone}</p>
    </SC.InfoUser>
  );
};
