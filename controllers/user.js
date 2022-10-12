const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesnt exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const signup = async (req, res) => {
  const { email, password, repeatPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(404).json({ message: "User already exist." });

    if (password !== repeatPassword) {
      return res.status(404).json({ message: "Password don't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { signin, signup };
