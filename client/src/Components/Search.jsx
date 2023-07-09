import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { api_slash } from "../api/api";
import Box from "@mui/material/Box";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  Container,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [hideSearch, setHideSearch] = useState(true);

  const searchCenter = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(api_slash + "center/" + searchQuery, {
        searchQuery,
      });
      setSearchResult(data);
    } catch (e) {
      alert("not found");
    }
  };

  const handleSearch = (e) => {
    setHideSearch(false);
  };

  

  return (
    <div>
      <Box component="form" noValidate onSubmit={searchCenter} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Search Centers"
          id="search"
          value={searchQuery}
          sx={{ marginTop: 3 }}
          autoComplete="off"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchResult && (
          <Container sx={{ py: 8 }} maxWidth="md">
            <h3>Search results</h3>
            <br />
            <br />

            {/* End hero unit */}
            <Grid container spacing={4}>
              {searchResult?.center?.map((card) => (
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
                        
                          pt: "0px",
                        }}
                        image={`${api_slash}${card?.image[0]}`}
                        alt="center image"
                      />

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                        <Typography>{card.description}</Typography>
                        <Typography>Location: {card.address}</Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>
                  </Link>
                  ▬
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </Box>
    </div>
  );
}

export default Search;
