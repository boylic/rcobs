import React from "react";
import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useContext, useEffect } from "react";
import { TextField, Grid } from "@mui/material";
import { UserContext } from "../UserContext";
import axios from "axios";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function BookingComponent({ center }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user?.fname);
    }
  }, [user]);

  const handleCheckInDate = (date) => {
    setCheckIn(date);
  };

  const handleCheckOutDate = (date) => {
    setCheckOut(date);
  };

  async function bookThisPlace() {
    if (!user) {
      alert("You have to log in to book this place");
      navigate("/login");
    } else {
      const response = await axios.post(api + "/booking", {
        checkIn,
        checkOut,
        name,
        phone,
        center: center._id,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ marginBottom: 3, flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <DatePicker
              onChange={handleCheckInDate}
              label="select a Check In date"
              value={checkIn}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              onChange={handleCheckOutDate}
              label="select a Check Out date"
              value={checkIn}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="phone"
              value={phone}
              label="phone"
              name="phone"
              autoComplete="phone"
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
            />
          </Grid>

          <Grid item sx={{}} xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={bookThisPlace}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
