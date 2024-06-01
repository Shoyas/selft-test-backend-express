import jwt from "jsonwebtoken";

export const authenticateMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.body.userId = userId;
    next();
  } catch (error) {
    res.status(401).send({
      message: "You are not authorized person",
      data: error,
      success: false,
    });
  }
};
