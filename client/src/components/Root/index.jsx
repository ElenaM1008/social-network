import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import * as SC from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlices";

export const Root = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickExitBtn = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <>
      <SC.Menu>
        {!currentUser && <SC.MenuItem to={"/"}>HOME</SC.MenuItem>}
        {!currentUser && <SC.MenuItem to={"/auth"}>Авторизация</SC.MenuItem>}
        {!currentUser && <SC.MenuItem to={"/registration"}>Регистрация</SC.MenuItem>}
		  {currentUser && <SC.MenuItem to={"/myprofile"}>Me</SC.MenuItem>}
		  {currentUser && <div>{`Добро пожаловать, ${currentUser.userType === 'admin' ? "Админ" : currentUser.name }`}</div>}
        {currentUser && <button onClick={onClickExitBtn}>Выход</button>}
      </SC.Menu>
      <Outlet />
    </>
  );
};