import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  registerValidator,
  loginValidator,
  postCreationValidator,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.qkyum.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use("/upload", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
);
app.get("/tags", PostController.getLastTags);
app.get("/posts/tags", PostController.getLastTags);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (e) {
    res.status(500).json("Непридвиденная ошибка");
  }
});

app.post(
  "/posts",
  checkAuth,
  postCreationValidator,
  handleValidationErrors,
  PostController.create
);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.deleteOne);
PostController.create;
app.put("/posts/:id", checkAuth, postCreationValidator, PostController.update);

app.listen(9999, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("its alive");
});
