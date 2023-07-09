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

exports.get_mycs_bookings = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, userData) => {
    if (err) throw err;
    const bookings = await Booking.find({})
      .populate({path: 'center', match: { owner: userData.id }, 
      select: '_id title address image description perks', })
      .populate({path: 'user', match:{ user: 'user._id'}, select: '_id fname lname email'})
      .exec()
    const filteredBookings = bookings.filter((booking) => booking.center !== null);
    const bookingsData = filteredBookings.map((booking) => ({
      bookingId: booking._id,
      center: {
        centerId: booking.center._id,
        title: booking.center.title,
        address: booking.center.address,
        image: booking.center.image,
        description: booking.center.description,
        perks: booking.center.perks,
      },
      user: {
        userId: booking.user._id,
        fname: booking.user.fname,
        lname: booking.user.lname,
        email: booking.user.email,
      },
      checkIn: booking.checkIn.toLocaleDateString(),
      checkOut: booking.checkOut.toLocaleDateString(),
      phone: booking.phone,
      name: booking.name
    }));
    
    res.json(bookingsData);
  });
};