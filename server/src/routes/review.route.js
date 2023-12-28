import express from "express";
import { body } from "express-validator";
import reviewController from "../controller/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import responseHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true })

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewOfUser
)

router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
    body("content")
    .exists().withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content can not be empty"),
    body("mediaType").exists().withMessage("mediatype es requerida")
  .custom( type => ["movie", "tv"].includes(type)).withMessage("mediatype invalid"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle requerida"),
    body("mediaPoster")
    .exists().withMessage("mediaPoster requerida"),
    body("mediaRate")
    .exists().withMessage("mediaRate requerida"),
    responseHandler.validate,
    reviewController.create
);

router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.remove
);

export default router