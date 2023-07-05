import React from "react";
import NavBar from "../Components/NavBar";
import AccountNav from "./AccountNav";
import { Box, Container, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { api, api_slash } from "../api/api";
import BookingDates from "../Components/BoookingDates";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get(api + "/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

 
  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "", height: "100vh", paddingTop: 12 }}>
          <AccountNav />
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {bookings?.map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4}>
                  <Link
                    to="/viewpage"
                    style={{ textDecoration: "none" }}
                    onClick={() => localStorage.setItem("centerId", card?._id)}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image={`${api_slash}${card?.center.image[0]}`}
                        alt="center image"
                      />

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.center.title}
                        </Typography>
                        <BookingDates
                          booking={card}
                          className="mb-2 mt-4 text-gray-500"
                        />
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>
                  </Link>
                  ▬
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>
    </div>
  );
}

export default MyBookings;
