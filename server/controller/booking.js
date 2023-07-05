const Booking = require("../model/Booking");
const secret = process.env.secret;
const jwt = require("jsonwebtoken");

function getUserDataFromReq(req, res) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, secret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

exports.booking = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { center, checkIn, checkOut, name, phone, price } = req.body;
  Booking.create({
    center,
    checkIn,
    checkOut,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

exports.get_bookings = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, userData) => {
    if (err) throw err;
    res.json(await Booking.find({ user: userData.id }).populate("center"));
  });
};
