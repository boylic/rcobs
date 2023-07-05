import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api/api";

import NavBar from "../Components/NavBar";

import { Box, Container, Button, Grid } from "@mui/material";
import MyCenters from "./MyCenters";
import AccountNav from "./AccountNav";

function Account() {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "account";
  }

  async function logout() {
    await axios.post(api + "/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) {
    return "Loading...";
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }


  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "", height: "100vh", paddingTop: 12 }}>
          <AccountNav />
          {subpage === "account" && (
            <Grid>
              <Box sx={{ textAlign: "center", marginTop: 3 }}>
                Logged in as {user?.fname}
              </Box>{" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
                onClick={logout}
              >
                Logout
              </Button>
            </Grid>
          )}
          {subpage === "centers" && (
            <Grid>
              <MyCenters />
            </Grid>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default Account;
