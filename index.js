import express from "express";
import mongoose from "mongoose";


import { registerValidator,loginValidator, postCreationValidator } from "./validations.js";
import checkAuth from './utils/checkAuth.js'
import { getMe, login, register } from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js"

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.qkyum.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  });

const app = express();

app.use(express.json());

app.post("/auth/login",loginValidator, login);
app.post("/auth/register", registerValidator,register );
app.get('/auth/me',checkAuth,getMe)

app.post('/posts',checkAuth,postCreationValidator,PostController.create)
app.get('/posts',PostController.getAll)
app.get('/posts/:id',PostController.getOne)
app.delete('/posts/:id',checkAuth,PostController.deleteOne)


app.listen(9999, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("its alive");
});
