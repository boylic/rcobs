import React from "react";
import NavBar from "../Components/NavBar";
import AccountNav from "./AccountNav";
import { Box, Container, Button, Grid } from "@mui/material";
import { useState, useEffect,useContext } from "react";
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
  const [centerBookings, setCenterBookings] = useState([])
    useEffect(() => {
    axios.get(api + "/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(api + "/get-mycs-bookings").then(({ data }) => {
      console.log(api)
      setCenterBookings(data);
      console.log(centerBookings)
    });
  }, []);

 const cardStyles = {
   border:"1px solid #ccc",
   borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#f9f9f9",
    display: "flex",
 };

 const titleStyles = {
  fontSize: "20px",
  fontWeight: "bold",
  display: "flex",
};

const descriptionStyles = {
  fontSize: "16px",
  color: "#666",
  display: "flex",
};

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
                    onClick={() => localStorage.setItem("centerId", card?.center)}
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
               {centerBookings?.map((booking)=>(
        
        <div key ={booking.id} style={cardStyles} >
          <h2  style={titleStyles}>
          {booking.name}<br/>
          {booking.phone}<br/>
          {booking.checkIn} {booking.checkOut}
          
          </h2>
          <p style={descriptionStyles}>{booking.description}</p>
        </div>
        ))}            
          
            </Grid>
          </Container>
        </Box>
      </Container>
      
      
      
    </div>
    
    
  );
  
}

export default MyBookings;
