import { Router } from "express";
import {
  index,
  show,
  store,
  update,
  destroy,
} from "../controller/walletController.js";
import authenticator from "../middleware/authenticator.js";

const router = Router();

//Public

router.use(authenticator);

//Private

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
