import e from "express";
import "dotenv/config";
import "./config/db.js";
import transactionRouter from "./router/transactionRouter.js";
import walletRouter from "./router/walletRouter.js";
import userRouter from "./router/userRouter.js";

const app = e();

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.use(e.json());
app.use("/transaction", transactionRouter);
app.use("/wallet", walletRouter);
app.use("/user", userRouter);

app.listen(process.env.DB, () => console.log("Server is running"));
