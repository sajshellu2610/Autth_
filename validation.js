const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (v) =>
  !v ? "Email is required" : !emailRegex.test(v) ? "Invalid email" : "";

export const validatePassword = (v) =>
  !v ? "Password is required" : v.length < 6 ? "Minimum 6 characters" : "";

export const validateUsername = (v) =>
  !v ? "Username is required" : v.length < 3 || v.length > 20 ? "3-20 characters" : "";

export const validateFullName = (v) =>
  !v ? "Full name is required" : v.length < 2 ? "Minimum 2 characters" : "";