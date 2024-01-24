import express, { Router } from "express";
import { body, validationResult } from "express-validator";
import {

  currentUser,
  requireAuth,
} from "@intellectx/build";

import { userController } from "../../../controllers";

export = (dependencies: any) => {
  const router = express.Router();
  const {
    signUpController,
    signInController,
    signOutController,

  } = userController(dependencies);

  router.post("/signup", signUpController);
  router.post("/login", signInController);
  router.post("/signout", signOutController);


  return router;
};
