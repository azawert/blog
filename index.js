import express from "express";
import mongoose from "mongoose";


import { registerValidator } from "./validations/auth.js";
import checkAuth from './utils/checkAuth.js'
import { getMe, login, register } from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.qkyum.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  });

const app = express();

app.use(express.json());

app.post("/auth/login", login);

app.post("/auth/register", registerValidator,register );

app.get('/auth/me',checkAuth,getMe)

app.listen(9999, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("its alive");
});
