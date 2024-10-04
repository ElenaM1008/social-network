import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../../redux/slices/authSlices";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import * as SC from "./styles";

export const NotificationList = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noNotification = currentUser.notification.length <= 0 

  const acceptFriends = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/list/request/add`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: id,
            recieverId: currentUser._id,
          }),
        }
      );
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(login(json));
    } catch (error) {
      console.log(error);
    }
  };

  const userDetail = async (id) => {
    try {
      const res = await fetch(`http://localhost:3003/api/users/list/${id}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(getUserInfo(json));
      navigate("/detail");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SC.List>
      { noNotification ? <p>Пока нет уведомлений</p>
		:
		 data.map((item) => (
        <SC.CardUser key={item._id}>
          <SC.UserLinks onClick={() => userDetail(item._id)}>
            <SC.UserLink>
              {item.name} {item.surname}
            </SC.UserLink>
          </SC.UserLinks>
          <SC.AddButton onClick={() => acceptFriends(item._id)}>
            Принять
          </SC.AddButton>
        </SC.CardUser>
      ))}
    </SC.List>
  );
};
