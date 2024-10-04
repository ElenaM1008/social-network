import React from "react";
import { useNavigate } from "react-router-dom";
import * as SC from "./styles";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
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
    </>
  );
};
