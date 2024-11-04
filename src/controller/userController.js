import User from "../model/userModel.js";
import jwtServices from "../services/jwtService.js";

export const signup = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Criptografa a senha
      role: req.body.role,
    });
    const token = jwtServices.generateAcessToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user && (await user.isValidPassword(req.body.password))) {
      const token = jwtServices.generateAcessToken(user);
      res.json({ user, token });
    } else {
      res.status(404).json({ error: "Email or password incorrect" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const store = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ error: "User not authenticated" });
    }
    const { text } = req.body;
    const user = req.user._id;
    const content = await User.create({ text, user });
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await User.find().exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await User.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).exec();
    res.status(204).json(); // Retorna status 204 para indicar exclusão sem conteúdo
  } catch (error) {
    res.status(400).json(error);
  }
};
