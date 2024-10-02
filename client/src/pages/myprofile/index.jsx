import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as SC from "./styles";
import { PostsPage } from "../posts";

export const MyProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <SC.Container>
      <SC.Nav>
        <SC.List>
          <SC.ListItem onClick={() => navigate("/myprofile")}>
            Мой профиль
          </SC.ListItem>
          <SC.ListItem onClick={() => navigate("/allpeople")}>Люди</SC.ListItem>
          <SC.ListItem onClick={() => navigate("/notification")}>
            Мои уведомления
          </SC.ListItem>
          <SC.ListItem onClick={() => navigate("/friends")}>
            Мои друзья
          </SC.ListItem>
        </SC.List>
      </SC.Nav>
      <SC.Content>
        <div>
          <SC.Title>Информация обо мне</SC.Title>
          <p>Имя: {currentUser.name}</p>
          <p>Фамилия: {currentUser.surname}</p>
          <p>Город: {currentUser.city}</p>
          <p>Дата рождения: {currentUser.birthday}</p>
          <p>Пол: {currentUser.gender}</p>
          <p>Номер телефона: {currentUser.phone}</p>
        </div>
		  <PostsPage/>
      </SC.Content>
    </SC.Container>
  );
};
