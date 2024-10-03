import React from "react";
import { useSelector } from "react-redux";
import * as SC from "./styles";

export const UserInfo = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <SC.InfoUser>
      <p>Имя: {currentUser.name}</p>
      <p>Фамилия: {currentUser.surname}</p>
      <p>Город: {currentUser.city}</p>
      <p>Дата рождения: {currentUser.birthday}</p>
      <p>Пол: {currentUser.gender}</p>
      <p>Номер телефона: {currentUser.phone}</p>
    </SC.InfoUser>
  );
};
