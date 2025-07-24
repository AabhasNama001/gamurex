// utils/auth.js

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const login = () => {
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
