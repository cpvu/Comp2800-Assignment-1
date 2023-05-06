import bcrypt from "bcrypt";
import { userModel } from "../models/authSchema.js";
import path from "path";
import Joi from "joi";
import { handleAuthValidate } from "../validator/validation.js";

export const postSignup = async (req, res) => {
  const { username, password } = req.body;

  const usernameError = handleAuthValidate(req.body);

  if (usernameError.error != null) {
    console.log(usernameError.error);
    return res
      .status(400)
      .send(
        `<p>${usernameError.error}</p> <a href='/signup'><button>Return to sign up</button></a>`
      );
  }

  let usernameExists = await userModel.findOne({ username: username });

  if (usernameExists) {
    return res
      .status(400)
      .send(
        `<p>Username taken!</p> <a href='/signup'><button>Return to sign up</button></a>`
      );
  }

  const hashedPassword = bcrypt.hashSync(password.toString(), 12);

  const userSuccess = new userModel({
    username: username,
    password: hashedPassword,
  });

  try {
    await userSuccess.save();
  } catch (err) {
    console.log(err);
  }

  console.log("User successfully registered!");

  res.status(200).redirect("/userPage");
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const usernameError = handleAuthValidate();

  if (usernameError.error != null) {
    return res.status(400).redirect("/login");
  }

  const validateUser = await userModel.findOne({
    username: username,
  });

  if (validateUser) {
    if (bcrypt.compareSync(password.toString(), validateUser.password)) {
      req.session.cookie.maxAge = 600000;
      req.session.authenticated = true;
      req.session.username = username; 
    }
    res.redirect("/userPage");
    return;
  }
  return res.send(
    "Invalid credentials! <a href='/login'><button>Try again</button></a>"
  );
};

export const postSignOut = async (req, res) => {
  if (req.session.authenticated == true) {
    req.session.destroy();
    res.render("home", {buttonNameOne: "Sign Up", buttonNameTwo: "Login",  routeOne: "/signup", routeTwo: "/login", authenticated: false});
    return;

  } else {
    console.log("l")
    res.status(400).end();
  }

};

export const postAddAdmin = async (req, res) => {
  if (req.session.authenticated)  {
    const validateAdmin = await userModel.findOne({username: req.session.username}) 

    if (validateAdmin.userType == "admin") {
      const username = req.body.username;
      await userModel.findOneAndUpdate({username: username}, {userType: "admin"}); 
      console.log(`${username} updated to an Admin!`)

      return res.status(200).json({status: "Updated", user: username});
    } 
  }
  res.status(401).json({status: "Not allowed"});
}

export const postRemoveAdmin = async (req, res) => {
  if (req.session.authenticated)  {
    const validateAdmin = await userModel.findOne({username: req.session.username}) 

    if (validateAdmin.userType == "admin") {
      const username = req.body.username;
      await userModel.findOneAndUpdate({username: username}, {userType: "user"}); 
      console.log(`User: ${username} updated to a user`)

      return res.status(200).json({status: "Updated", user: username});
    } 
  }
  res.status(401).json({status: "Not allowed"});
}
