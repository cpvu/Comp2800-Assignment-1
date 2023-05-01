import path from "path";

export const getHomePage = (req, res) => {
  if (!req.session.authenticated) {
    res.sendFile(path.join(path.resolve(), "public", "home.html"));
  } else {
    res.sendFile(path.join(path.resolve(), "public", "userPage.html"));
  }
};

export const getSignUp = (req, res) => {
  const signUpPath = path.join(path.resolve(), "public", "signup.html");
  res.sendFile(signUpPath);
};

export const getLogin = (req, res) => {
  const loginPath = path.join(path.resolve(), "public", "login.html");
  res.sendFile(loginPath);
};

export const getUserPage = (req, res) => {};
