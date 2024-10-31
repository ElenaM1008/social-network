import React from "react";
import { useSelector } from "react-redux";
import { login } from "../../../../redux/slices/authSlices";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import * as SC from "./styles";
import { FetchData } from "../../../../components/FetchData";

export const NotificationList = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.notification);
  const navigate = useNavigate();

  const noNotification = currentUser.notification.length <= 0;

  const { fetchData } = FetchData();

  const acceptFriends = async (id) => {
    await fetchData({
      senderId: id,
      recieverId: currentUser._id,
      url: `http://localhost:3003/api/users/list/request/add`,
      method: "put",
      cb: login,
    });
  };

  const userDetail = async (id) => {
    await fetchData({
      id: id,
      url: `http://localhost:3003/api/users/list/${id}`,
      method: "post",
      cb: getUserInfo,
    });
    navigate("/detail");
  };

  return (
    <SC.List>
      {noNotification ? (
        <p>Пока нет уведомлений</p>
      ) : (
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
        ))
      )}
    </SC.List>
  );
};
