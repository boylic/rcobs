import React from "react";
import NavBar from "../Components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { useEffect, useState } from "react";
import { api, api_slash } from "../api/api";

import {
  Box,
  Typography,
  Card,
  Container,
  CardMedia,
  CardContent,
} from "@mui/material";
import BookingComponent from "./BookingComponent";

function ViewPage() {
  const [center, setCenter] = useState([]);
  const [img, setImg] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("centerId");
    axios.get(api + "/get-center/" + id).then(({ data }) => {
      setCenter(data);
    });
  }, []);

  useEffect(() => {
    if (center.image) setImg(`${api_slash}${center?.image[0]}`);
  });

  return (
    <div>
      <NavBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#ffff", height: "100vh", paddingTop: 12 }}>
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={img}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {center.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {center.description}
              </Typography>
            </CardContent>

            <BookingComponent center={center} />
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default ViewPage;
