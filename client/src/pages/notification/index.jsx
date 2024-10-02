import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyNotification,
  getAllNotifications,
} from "../../redux/slices/notificationSlices";
import { login } from "../../redux/slices/authSlices";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../redux/slices/detailUserSlices";

export const Notification = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.notification.length) {
      dispatch(getAllNotifications({ arr: currentUser.notification }));
    } else {
      dispatch(emptyNotification());
    }
  }, [currentUser]);

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
    <div>
      <h2>Уведомления</h2>
      {data.map((item) => (
        <div key={item._id}>
          <div onClick={() => userDetail(item._id)}>
            <span>{item.name} </span>
            <span>{item.surname} </span>
          </div>
          <button onClick={() => acceptFriends(item._id)}>Принять</button>
        </div>
      ))}
    </div>
  );
};
