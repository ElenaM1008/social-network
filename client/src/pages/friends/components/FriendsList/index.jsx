import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import * as SC from "./styles";
import { FetchData } from "../../../../components/FetchData";

export const FriendsList = () => {
  const { data } = useSelector((state) => state.friends);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const noFriends = currentUser.friends.length;

  const { fetchData } = FetchData();

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
      {noFriends <= 0 ? (
        <p>Пока нет друзей</p>
      ) : (
        data.map((item) => (
          <SC.CardUser key={item._id}>
            <SC.UserLinks onClick={() => userDetail(item._id)}>
              <SC.UserLink>
                {item.name} {item.surname}
              </SC.UserLink>
            </SC.UserLinks>
          </SC.CardUser>
        ))
      )}
    </SC.List>
  );
};
