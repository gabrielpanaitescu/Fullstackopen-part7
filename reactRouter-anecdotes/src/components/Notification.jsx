import { useNotificationValue } from "../Contexts/NotificationContext";

const Notification = () => {
  const message = useNotificationValue();

  if (message === null) return null;

  return <p>{message}</p>;
};

export default Notification;
