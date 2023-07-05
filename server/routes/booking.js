const bookingController = require("../controller/booking");
const express = require("express");
const router = express.Router();

router.post("/booking", bookingController.booking);
router.get("/bookings", bookingController.get_bookings);

module.exports = router;
