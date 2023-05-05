import path from "path";
import { userModel } from "../models/authSchema.js";

export const getHomePage = (req, res) => {
  if (req.session.authenticated == true) {
    res.render("home", {buttonNameOne: "Member Page", buttonNameTwo: "Log Out", routeOne: "/userPage", routeTwo: "/", authenticated: true})
  } else {
    res.render("home", {buttonNameOne: "Sign Up", buttonNameTwo: "Login",  routeOne: "/signup", routeTwo: "/login", authenticated: false});
  }
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

export const getAdminPage = async (req, res) => {
  if (req.session.authenticated)  {
    const validateAdmin = await userModel.findOne({username: req.session.username}) 

    if (validateAdmin.userType == "admin") {
      const users = await userModel.find();
      return res.render("admin", {users: users});
    } 
  }

  return res.status(401).send("Unauthorized access");
}
