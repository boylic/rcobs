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
  TableCell, TableContainer, TableHead, TableBody,  Paper, Table, TableRow
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
  let serial = 0
 
  function addSerial(){
    serial ++
    return serial;
  }

  return (
    
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "", minHeight: "100vh", paddingTop: 12 }}>
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
               </Grid> 
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
          <TableCell><b>S/N</b></TableCell>
            <TableCell><b>Title</b></TableCell>
            <TableCell align="right"><b>Booker</b></TableCell>
            <TableCell align="right"><b>Phone</b></TableCell>
            <TableCell align="right"><b>Check in</b></TableCell>
            <TableCell align="right"><b>Check out</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {centerBookings?.map((booking) => (
            <TableRow
              key={booking.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {addSerial()}
              </TableCell>
              <TableCell component="th" scope="row">
              {booking.center.title}
              </TableCell>
              <TableCell align="right">{booking.name}</TableCell>
              <TableCell align="right">{booking.phone}</TableCell>
              <TableCell align="right">{booking.checkIn}</TableCell>
              <TableCell align="right">{booking.checkOut}</TableCell>
            </TableRow> ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
        </Box>
      </Container>
    </div>
  );
}

export default MyBookings;
