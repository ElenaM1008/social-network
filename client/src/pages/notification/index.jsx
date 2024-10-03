import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyNotification, getAllNotifications } from "../../redux/slices/notificationSlices";
import * as SC from "./styles";
import { Title } from "../../components/ui/Title";
import { NotificationList } from "./components/NotificationList";

export const Notification = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.notification.length) {
      dispatch(getAllNotifications({ arr: currentUser.notification }));
    } else {
      dispatch(emptyNotification());
    }
  }, [currentUser, dispatch]);

  return (
    <SC.Container>
      <Title title={"Уведомления"} />
      <NotificationList />
    </SC.Container>
  );
};
