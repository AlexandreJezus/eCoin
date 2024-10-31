import { Router } from "express";
import {
  index,
  show,
  store,
  update,
  destroy,
  login,
  signup,
} from "../controller/userController.js";

import authorizer from "../middleware/authorizer.js";
import authenticator from "../middleware/authenticator.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);

router.use(authenticator);

router.use(authorizer(["ADMINISTRATOR"]));

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
