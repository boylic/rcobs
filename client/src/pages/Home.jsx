import React from "react";
import NavBar from "../Components/NavBar";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import axios from "axios";
import { api, api_slash } from "../api/api";
import Search from "../Components/Search";

import {
  Box,
  Typography,
  Card,
  Container,
  Stack,
  Button,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const Home = () => {
  const { user } = useContext(UserContext);
  const [center, setCenter] = useState([]);

  useEffect(() => {
    axios.get(api + "/get-center").then(({ data }) => {
      if (data) {
        setCenter(data);
      } else {
        console.log("data no found");
      }
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <CssBaseline />

      <Main>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "#f0f0f0",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Best booking system
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                We can help you grab your favorite rec center without lifting a
                foot, whether at home or office.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">
                  {!user ? (
                    <Link to="/signup">Sign up</Link>
                  ) : (
                    "hello " + user?.fname
                  )}
                </Button>
                <Button variant="contained">
                  {user ? (
                    <Link to="/Account">Sign out</Link>
                  ) : (
                    <Link to="/login">Sign in</Link>
                  )}
                </Button>
              </Stack>
              <Search />
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {center?.map((card) => (
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
        </main>
      </Main>
    </Box>
  );
};

export default Home;
