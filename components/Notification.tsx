import { FC, useEffect } from "react";
import styled from "styled-components";
import { Istate, notificationActions } from "../store/notification-slice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  position: absolute;
  width: 250px;
  height: 50px;
  right: 50px;
  bottom: 50px;
  border: 1px solid var(--font-color);
`;

const Notification: FC<{ notification: Istate }> = ({ notification }) => {
  const dispatch = useDispatch();
  const TERMINAL_ALERTS = {
    default: "terminal-alert",
    success: "terminal-alert terminal-alert-primary",
    error: "terminal-alert terminal-alert-error",
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.removeNotification());
    }, notification.duration);
  }, [dispatch, notification.duration]);

  return (
    <Container className={TERMINAL_ALERTS[notification.type]}>
      {notification.text}
    </Container>
  );
};

export default Notification;
