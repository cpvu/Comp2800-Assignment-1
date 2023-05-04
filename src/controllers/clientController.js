import path from "path";

export const getHomePage = (req, res) => {
  if (req.session.authenticated == true) {
    res.redirect("/userPage");
  }
  res.render(path.join(path.resolve(), "src", "views", "home"));
};

export const getSignUp = (req, res) => {
  if (req.session.authenticated == true) {
    res.redirect("/userPage");
  }
  const signUpPath = path.join(path.resolve(), "src", "views", "signup");
  res.render(signUpPath);
};

export const getLogin = (req, res) => {
  if (req.session.authenticated == true) {
    res.redirect("/userPage");
  }
  const loginPath = path.join(path.resolve(), "src", "views", "login");
  res.render(loginPath);
};

export const getUserPage = (req, res) => {
  if (req.session.authenticated == true) {
    const userPagePath = path.join(
      path.resolve(),
      "src",
      "views",
      "userPage"
    );
    console.log(userPagePath);
    res.render(userPagePath);
  } else {
    res.status(400).redirect("/");
  }
};
