import React, { useState, useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { api, api_slash } from "../api/api";

function MyCenters() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get(api + "/get-user-center").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "", height: "100vh", paddingTop: 12 }}>
          <AccountNav />
          <Link to={"/add-center"}>
            <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>
              <AddIcon /> Add center
            </Button>
          </Link>
          <div className="mt-4 ">
            {places?.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
              >
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                  <img
                    src={`${api_slash}${place?.image[0]}`}
                    className="w-full"
                    alt="center_img"
                  />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default MyCenters;
