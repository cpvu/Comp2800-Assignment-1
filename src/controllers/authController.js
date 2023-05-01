import bcrypt from "bcrypt";
import { userModel } from "../models/authSchema.js";
import path from "path";

export const postSignup = async (req, res) => {
  const { username, password } = req.body;
  //validator

  console.log(username);
  console.log(password);

  let usernameExists = await userModel.findOne({ username: username });

  if (usernameExists) {
    res.send(
      "Username already exists <a href='/signup'><button>Return to sign up</button></a>"
    );
  }

  const hashedPassword = bcrypt.hashSync(password.toString(), 12);
  console.log(hashedPassword);

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
  const signUpPath = path.join(path.resolve(), "public", "signupSuccess.html");
  res.sendFile(signUpPath);
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const validateUser = await userModel.findOne({
    username: username,
  });

  if (validateUser) {
    if (bcrypt.compareSync(password.toString(), validateUser.password)) {
      req.session.cookie.maxAge = 600000;
      req.session.authenticated = true;
    }
    return res.redirect("http://localhost:8000/");
  }
  return res.send(
    "Invalid credentials! <a href='/login'><button>Try again</button></a>"
  );
};
