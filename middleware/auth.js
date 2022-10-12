const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    decodedData = jwt.verify(token, "secret");

    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
