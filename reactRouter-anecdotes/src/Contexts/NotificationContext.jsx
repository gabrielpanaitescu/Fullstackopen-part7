import { createContext, useContext } from "react";
import { useReducer } from "react";

const NotificationContext = createContext(null);

export const useNotificationDispatch = () => {
  const { dispatch } = useContext(NotificationContext);

  return (message, seconds = 5) => {
    dispatch({ type: "set_notification", payload: message }, seconds);

    setTimeout(() => {
      dispatch({ type: "clear_notification" });
    }, seconds * 1000);
  };
};

export const useNotificationValue = () => {
  const { state } = useContext(NotificationContext);

  return state;
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "set_notification":
      return action.payload;
    case "clear_notification":
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
