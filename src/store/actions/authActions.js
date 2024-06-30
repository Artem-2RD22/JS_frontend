// src/store/actions/authActions.js

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const logoutUser = () => {
    localStorage.removeItem('token');
    return {
      type: 'LOGOUT_USER',
    };
  };
  