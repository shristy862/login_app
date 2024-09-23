"use client"; 

import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  email: null,
  userType: null,
};

// Create context
export const UserContext = createContext();

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, email: action.payload.email, userType: action.payload.userType };
    case 'LOGOUT':
      return { ...state, email: null, userType: null };
    default:
      return state;
  }
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
