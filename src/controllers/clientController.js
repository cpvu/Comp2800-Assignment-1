import path from "path";

export const getHomePage = (req, res) => {
  if (req.session.authenticated == true) {
    res.redirect("/userPage");
  }
  res.sendFile(path.join(path.resolve(), "src", "public", "home.html"));
};

export const getSignUp = (req, res) => {
  if (req.session.authenticated == true) {
    res.redirect("/userPage");
  }
  const signUpPath = path.join(path.resolve(), "src", "public", "signup.html");
  res.sendFile(signUpPath);
};

export const getLogin = (req, res) => {
  if (req.session.authenticated == true) {
    res.redirect("/userPage");
  }
  const loginPath = path.join(path.resolve(), "src", "public", "login.html");
  res.sendFile(loginPath);
};

export const getUserPage = (req, res) => {
  if (req.session.authenticated == true) {
    const userPagePath = path.join(
      path.resolve(),
      "src",
      "public",
      "userPage.html"
    );
    console.log(userPagePath);
    res.sendFile(userPagePath);
  } else {
    res.status(400).redirect("/");
  }
};
