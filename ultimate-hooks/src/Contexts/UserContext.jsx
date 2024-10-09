import { createContext, useContext, useReducer } from "react";

const UserContext = createContext(null);

const userReducer = (state, action) => {
  switch (action.type) {
    case "set_user":
      return action.payload;
    default:
      return state;
  }
};

export const useUserContextValue = () => {
  const { user } = useContext(UserContext);

  return user;
};

export const useUserDispatch = () => {
  const { userDispatch } = useContext(UserContext);

  const setUser = (user) => {
    userDispatch({ type: "set_user", payload: user });
  };

  return setUser;
};

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
