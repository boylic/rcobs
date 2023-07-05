const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const secret = process.env.secret;

bcryptSalt = bcrypt.genSaltSync(10);

exports.signup = async (req, res, next) => {
  const { fname, lname, email, password } = req.body;

  if (!fname || !lname || !email || !password) {
    res.status(401).json({ msg: "all fields are required!" });
  } else {
    const userDoc = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    await userDoc.save();
    res.json(userDoc);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, fname: userDoc.fname },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("incorrect password");
    }
  } else {
    res.status(400).json("user not found");
  }
};

exports.get_user = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, secret, {}, async (err, userData) => {
      if (err) throw err;
      const { fname, email, _id } = await User.findById(userData.id);
      res.json({ fname, email, _id, token });
    });
  } else {
    res.json(null);
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", { sameSite: "none", secure: true }).json(true);
};
