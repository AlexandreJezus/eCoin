import { Schema, model } from "mongoose";

const walletSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["BRL", "USD", "BTC"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = model("Wallet", walletSchema);

export default Wallet;
