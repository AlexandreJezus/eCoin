import Transaction from "../model/transactionModel.js";
import Wallet from "../model/walletModel.js";
import jwtServices from "../services/jwtService.js";

export const store = async (req, res) => {
  try {
    const content = await Wallet.create(req.body);

    res.status(201).json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const index = async (req, res) => {
  try {
    const content = await Wallet.find().exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const show = async (req, res) => {
  try {
    const content = await Wallet.findById(req.params.id).exec();

    res.json(content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Wallet.findOne({
      email,
      password,
    }).exec();

    if (user && user.isValidPassword(password)) {
      const token = jwtServices.generateAcesssToken(user);
      res.json(token);
    } else {
      res.status(404).json({
        error: "Email or password invalid.",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const content = await Wallet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const destroy = async (req, resp) => {
  try {
    await Wallet.findByIdAndDelete(req.params.id).exec();
    resp.status(204).json(); // Retorna status 204 sem conteúdo
  } catch (error) {
    resp.status(400).json(error);
  }
};

export const getBalance = async (req, res) => {
  try {
    const content = await Wallet.findOne({ userId: req.params.userId }).exec();
    if (content) {
      res.json({ balance: content.balance });
    } else {
      res
        .status(404)
        .json({ error: "Carteira não encontrada para este usuário." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
