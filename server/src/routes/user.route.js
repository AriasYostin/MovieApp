import express from "express";
import { body } from "express-validator";
import favoriteController from "../controller/favorite.controller.js";
import userController from "../controller/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Nombre de usuario mínimo 8 caracteres")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) {
        return Promise.reject("Nombre de usuario ya está en uso");
      }
    }),
  body("password").isLength({ min: 8 }).withMessage("Contraseña mínimo 8 caracteres"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Confirmar contraseña mínimo 8 caracteres")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirmar contraseña no coincide");
      }
      return true;
    }),
    body("displayName").isLength({ min: 8 }).withMessage("Nombre para mostrar mínimo 8 caracteres"),
    requestHandler.validate,
    userController.signup
);

router.post(
    "/signin",
    body("username")
    .isLength({ min: 8 })
    .withMessage("Nombre de usuario mínimo 8 caracteres"),
    body("password")
    .isLength({ min: 8 })
    .withMessage("Contraseña de usuario mínimo 8 caracteres"),
    requestHandler.validate,
    userController.signin
)

router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
    .exists().withMessage("Contraseña requerida")
    .isLength({ min: 8 }).withMessage("Contrasela minimo 8 caracteres"),
    body("newPassword")
    .exists().withMessage("Nueva contraseña requerida")
    .isLength({ min: 8 }).withMessage("Nueva contraseña, minimo 8 caracteres"),
    body("confirmNewPassword")
    .exists().withMessage("Confirmar nueva contraseña requerido")
    .isLength({ min: 8 }).withMessage("Confirmar nueva contraseña, minimo 8 caracteres")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error("ConfirmPassword not match");
      return true;
    }),
    requestHandler.validate,
    userController.updatePassword
);

router.get(
  "/info",
  tokenMiddleware.auth,
  userController.getInfo
)

router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);

router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType").exists().withMessage("mediatype es requerida")
  .custom( type => ["movie", "tv"].includes(type)).withMessage("mediatype invalid"),
  body("mediaId")
    .exists().withMessage("mediaId requerida")
    .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("mediaTitle")
    .exists().withMessage("mediaTitle requerida"),
    body("mediaPoster")
    .exists().withMessage("mediaPoster requerida"),
    body("mediaRate")
    .exists().withMessage("mediaRate requerida"),
    requestHandler.validate,
    favoriteController.addFavorite
);

router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
)

export default router;