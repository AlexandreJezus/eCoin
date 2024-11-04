import jwtServices from "../services/jwtService.js";

const jwtAuthenticator = (req, res, next) => {
  try {
    // console.log("aqui");
    const token = req.headers.authorization.split(" ")[1];
    const user = jwtServices.verifyAcessToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("");
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

export default jwtAuthenticator;
