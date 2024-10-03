import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { noFriends, getAllFriends } from "../../redux/slices/friendsSlices";
import * as SC from "./styles";
import { Title } from "../../components/ui/Title";
import { FriendsList } from "./components/FriendsList";

export const MyFriends = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (currentUser.friends.length) {
      dispatch(getAllFriends({ arr: currentUser.friends }));
    } else {
      dispatch(noFriends());
    }
  }, [currentUser, dispatch]);

  return (
    <SC.Container>
      <Title title={"Мои друзья"} />
       <FriendsList/>
    </SC.Container>
  );
};