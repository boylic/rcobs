import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];


  if (subpage === undefined) {
    subpage = "account";
  }
  function linkClasses(type = null) {
    let classes = "py-w px-6";
    if (type === subpage || (subpage === undefined && type === "account")) {
      classes += " bg-[#1976d2] text-white px-6 py-2 rounded-full text-sm";
    }
    return classes;
  }

  return (
    <div>
      <Grid container justifyContent="center" spacing={0.5}>
        <Grid sx={{ marginRight: 3 }}>
          <Link to={"/account"} className={linkClasses("account")}>
            My account
          </Link>
        </Grid>
        <Grid sx={{ marginRight: 3 }}>
          <Link to={"/account/bookings"} className={linkClasses("bookings")}>
            My bookings
          </Link>
        </Grid>
        <Grid sx={{ marginRight: 3 }}>
          <Link className={linkClasses("centers")} to={"/account/centers"}>
            My centers
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default AccountNav;
