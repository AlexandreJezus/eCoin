import Transaction from "../model/transactionModel.js";
import Wallet from "../model/walletModel.js";
import jwtServices from "../services/jwtService.js";

export const store = async (req, resp) => {
  try {
    const { walletFrom, walletTo, ammount, type } = req.body;

    // Verifica se a transação é uma transferência
    if (type === "transfer") {
      // Encontra as carteiras envolvidas
      const fromWallet = await Wallet.findById(walletFrom);
      const toWallet = await Wallet.findById(walletTo);

      // Verifica se a carteira de origem tem saldo suficiente
      if (fromWallet.balance < ammount) {
        return resp.status(400).json({ error: "Saldo insuficiente." });
      }

      // Atualiza os saldos das carteiras
      fromWallet.balance -= ammount; // Diminui o saldo da carteira de origem
      toWallet.balance += ammount; // Aumenta o saldo da carteira de destino

      await fromWallet.save(); // Salva as alterações da carteira de origem
      await toWallet.save(); // Salva as alterações da carteira de destino
    }

    // Cria a transação
    const content = await Transaction.create(req.body);
    resp.status(201).json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await Transaction.find().exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const show = async (req, res) => {
  try {
    const content = await Transaction.findById(req.params.id)
      .populate(["walletFrom", "walletTo"]) // Popula as carteiras associadas
      .exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const content = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ) // Retorna a transação atualizada
      .exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const destroy = async (req, resp) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id).exec();
    resp.status(204).json(); // Retorna status 204 sem conteúdo
  } catch (error) {
    resp.status(400).json(error);
  }
};
