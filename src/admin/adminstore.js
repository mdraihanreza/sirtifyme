import React, { createContext, useReducer } from "react";

const InitialState = {
  email: "",
  password: "",
  admintoken: "",

};

function reducer(state, action) {
  switch (action.type) {
    case "id":
      return {
        ...state,
        id: action.value,
      };

    case "email":
      return {
        ...state,
        email: action.value,
      };
    case "admintoken":
      return {
        ...state,
        admintoken: action.value,
      };
    case "reset":
      return { ...InitialState };

    default:
      return { ...state };
  }
}

export const userContext = createContext();

function AdminStore({ children }) {
  const [userState, dispatch] = useReducer(reducer, InitialState);


  return (
    <userContext.Provider value={{ userState, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

export default AdminStore;
