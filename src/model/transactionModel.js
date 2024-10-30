import { Schema, model } from "mongoose";

const walletSchema = new Schema(
  {
    walletFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    walletTo: {
      type: Schema.Types.ObjectId,
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

const Wallet = model("Wallet", walletSchema);

export default Wallet;
