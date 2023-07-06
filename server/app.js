const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/config");
const roleRouter = require("./routes/role");
const authRoute = require("./routes/auth");
const centerRoute = require("./routes/center");
const bookingRoute = require("./routes/booking");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });

const port = process.env.PORT;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);



app.use(express.json());
app.use(cookieParser());
app.use(authRoute);
app.use(multer({ storage: storage, fileFilter: fileFilter }).array("image"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(centerRoute);
app.use(bookingRoute);

app.use(roleRouter);

db();

app.listen(port, () => {
  console.log(`connected to local host: ${port}`);
});
