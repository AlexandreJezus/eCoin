export default (Role) => async (req, res, next) => {
  try {
    if (req.user.role !== Role) {
      res
        .status(403)
        .json({ message: "Acesso negado, permissões insuficientes." });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Acesso negado, token inválido." });
  }
};
