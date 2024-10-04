import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../redux/slices/detailUserSlices";
import * as SC from "./styles";

export const FriendsList = () => {
  const { data } = useSelector((state) => state.friends);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noFriends = currentUser.friends.length <= 0;

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
      { noFriends ? <p>Пока нет друзей</p>
		:
		data.map((item) => (
        <SC.CardUser key={item._id}>
          <SC.UserLinks onClick={() => userDetail(item._id)}>
            <SC.UserLink>
              {item.name} {item.surname}
            </SC.UserLink>
          </SC.UserLinks>
        </SC.CardUser>
      ))}
    </SC.List>
  );
};
