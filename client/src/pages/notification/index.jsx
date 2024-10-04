import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllNotifications } from "../../redux/slices/notificationSlices";
import * as SC from "./styles";
import { Title } from "../../components/ui/Title";
import { NotificationList } from "./components/NotificationList";
import { NavBar } from "../../components/NavBar";

export const Notification = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotifications({ arr: currentUser.notification }));
  }, [currentUser, dispatch]);

  return (
    <SC.Container>
      <NavBar />
      <SC.Content>
        <Title title={"Уведомления"} />
        <NotificationList />
      </SC.Content>
    </SC.Container>
  );
};
