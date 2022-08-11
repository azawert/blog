import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 5 }),
  body("avatarUrl").optional().isURL(),
];

export const loginValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const postCreationValidator = [
  body("title", "Необходимо ввести заголовок статьи")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Необходимо ввести текст статьи")
    .isLength({ min: 25 })
    .isString(),
  body("tags", "Неверный формат тэгов").optional().isString(),
  body("imageUrl", "Неверная ссылка на картинку").optional().isString(),
];
