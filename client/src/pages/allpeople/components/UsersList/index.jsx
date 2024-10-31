import React from "react";
import { useSelector } from "react-redux";
import { login } from "../../../../redux/slices/authSlices";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import * as SC from "./styles";
import { FetchData } from "../../../../components/FetchData";

export const UsersList = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.findUser);

  const { fetchData } = FetchData();

  const sendRequest = async (id) => {
    await fetchData({
      requests: id,
      url: `http://localhost:3003/api/users/list/request/${currentUser._id}`,
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
    <SC.UsersArea>
      {data.map((item) => (
        <SC.CardUser key={item._id}>
          <SC.UserLinks>
            <SC.UserLink onClick={() => userDetail(item._id)}>
              {item.name} {item.surname}
            </SC.UserLink>
          </SC.UserLinks>
          <div>
            {currentUser.requests.includes(item._id) ||
            currentUser.friends.includes(item._id) ? (
              ""
            ) : (
              <SC.AddButton onClick={() => sendRequest(item._id)}>
                Добавить в друзья
              </SC.AddButton>
            )}
          </div>
        </SC.CardUser>
      ))}
    </SC.UsersArea>
  );
};
