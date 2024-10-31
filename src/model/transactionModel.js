import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    walletFrom: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    walletTo: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    ammount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["transfer", "deposit", "withdraw"],
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      required: true,
    },
    details: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
