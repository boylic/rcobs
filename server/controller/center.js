const Center = require("../model/Center");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

exports.add_center = (req, res) => {
  const { token } = req.cookies;
  const img = [];

  const imgloop = req.files.map((image) => {
    img.push(image.path);
  });

  const { title, address, description, extra_info, checkIn, checkOut, perks } =
    req.body;

  const image = img;

  jwt.verify(token, secret, {}, async (err, userData) => {
    const center = new Center({
      owner: userData.id,
      title: title,
      address: address,
      image: image,
      perks: perks,
      description: description,
      extra_info: extra_info,
      checkIn: checkIn,
      checkOut: checkOut,
    });

    await center
      .save()
      .then(() => res.status(201).json({ msg: "center added", center }))
      .catch((err) => console.log(err));
  });
  // const center = new Center({
  //   owner: userData.id,
  //   title: title,
  //   address: address,
  //   image: image,
  //   perks: perks,
  //   description: description,
  //   extra_info: extra_info,
  //   checkIn: checkIn,
  //   checkOut: checkOut,
  // });

  // center
  //   .save()
  //   .then(() => res.status(201).json({ msg: "center added", center }))
  //   .catch((err) => console.log(err));
};

exports.get_center = async (req, res, next) => {
  res.json(await Center.find());
};

exports.get_one_center = async (req, res) => {
  const { id } = req.params;
  res.json(await Center.findById(id));
};

exports.get_user_center = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Center.find({ owner: id }));
  });
};

exports.search_center = (req, res) => {
  const name = new RegExp(req.params.title);

  Center.find({ title: name }).then((center) => {
    if (!center) {
      return res.status(400).json({ message: "center not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "hostel found", center: center });
    }
  });
};
