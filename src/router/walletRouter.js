import { Router } from "express";
import {
  index,
  show,
  store,
  update,
  destroy,
  getBalance,
} from "../controller/walletController.js";
import authenticator from "../middleware/authenticator.js";
import authorizer from "../middleware/authorizer.js";

const router = Router();

//Public

router.use(authenticator);
router.use(authorizer("ADMINISTRATOR"));
//Private

router.get("/", index);
router.get("/:id", show);
router.get("/balance/:userId", getBalance); // Consultar saldo de uma carteira por userId
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
