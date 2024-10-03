import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/slices/authSlices";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import * as SC from "./styles";

export const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.findUser);

  const sendRequest = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3003/api/users/list/request/${currentUser._id}`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: id,
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
      <SC.UsersArea>
        {data.map((item) => (
          <SC.CardUser key={item._id}>
            <SC.UserLinks>
                <SC.UserLink  onClick={() => userDetail(item._id)}>
                  {item.name} {item.surname}
                </SC.UserLink>
            </SC.UserLinks>
            <div>
              {currentUser.requests.includes(item._id) ||
              currentUser.friends.includes(item._id) ? (
                ""
              ) : (
                <SC.AddButton onClick={() => sendRequest(item._id)}>Добавить в друзья</SC.AddButton>
              )}
            </div>
          </SC.CardUser>
        ))}
      </SC.UsersArea>
  );
};