import React from "react";
import NavBar from "../Components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";

import TextareaAutosize from "@mui/base/TextareaAutosize";

import { useState, useEffect } from "react";
import { api } from "../api/api";
import { Navigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TextField from "@mui/material/TextField";

import { Box, Card, Container, Button, Grid } from "@mui/material";
import axios from "axios";
import Perks from "../Components/Perks";
import { useParams } from "react-router-dom";

const AddCenter = () => {
  const { id } = useParams();

  const [redirect, setRedirect] = useState("");

  const [center, setCenter] = useState({
    title: "",
    address: "",
    image: "",
    description: "",
    extra_info: "",
    checkIn: "",
    checkOut: "",
    price: "",
  });

  const [perks, setPerks] = useState([]);

  const [img, setImg] = useState([]);

  useEffect(() => {
    const images = [],
      fileReaders = [];
    const imageFiles = center.image;
    if (imageFiles) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          setImg(images);
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [center.image]);

  async function savePlace(e) {
    e.preventDefault();

    const formData = new FormData();

    const files = center.image;

    formData.append("title", center.title);
    formData.append("address", center.address);
    for (let i = 0; i < files?.length; i += 1) {
      formData.append("image", files[i]);
      console.log(files[i]);
    }
    formData.append("description", center.description);
    formData.append("perks", perks);
    formData.append("checkIn", center.checkIn);
    formData.append("checkOut", center.checkOut);

    if (id) {
      
      await axios.put(api + "/add-center", {
        id,
        formData,
      });
      setRedirect(true);
    } else {
     
      await axios.post(api + "/add-center", formData, {
       
      });
      setRedirect(true);
    }
  }

  const handleChange = (e) => {
    setCenter({ ...center, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const { files } = e.target;
    const validImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      validImages.push(file);
    }
    setCenter({ ...center, image: validImages });
  };

  if (redirect) {
    return <Navigate to={"/account/centers"} />;
  }

  return (
    <div>
      <NavBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#ffff", height: "100vh", paddingTop: 12 }}>
          <Card sx={{ maxWidth: 600 }}>
            <form
              encType="multipart/form-data"
              onSubmit={savePlace}
              style={{ marginTop: 3, padding: 9 }}
              method="post"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Add Photos
                    <input
                      type="file"
                      hidden
                      onChange={handleImage}
                      multiple
                      name="image"
                    />
                  </Button>
                </Grid>
                <Container sx={{ marginTop: 2 }}>
                  {img.length > 0 ? (
                    <ImageList
                      // cols={1}
                      rowHeight={164}
                    >
                      {img.map((item) => (
                        <ImageListItem key={item}>
                          <img
                            src={`${item}`}
                            srcSet={`${item}`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  ) : (
                    ""
                  )}
                </Container>
                <Grid item xs={12}>
                  <TextareaAutosize
                    required
                    name="description"
                    label="description"
                    type="description"
                    id="description"
                    autoComplete="description"
                    onChange={handleChange}
                    minRows={3}
                    placeholder="add the description of your place"
                    style={{ width: 410, border: "1px solid #ddd" }}
                  />
                </Grid>
                <Perks selected={perks} onChange={setPerks} />
                <Grid item xs={12}>
                  <TextareaAutosize
                    required
                    name="extra_info"
                    label="extra_info"
                    type="extra_info"
                    id="extra_info"
                    autoComplete="extra info"
                    onChange={handleChange}
                    minRows={3}
                    placeholder="add extra infos. e.g house rules"
                    style={{ width: 410, border: "1px solid #ddd" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  Add check in and check out times
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="checkIn"
                    label="Checkin eg 1300"
                    name="checkIn"
                    autoComplete="family-name"
                    // value={checkIn}
                    onChange={handleChange}
                  />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="checkOut"
                    label="Check out eg 1900"
                    name="checkOut"
                    autoComplete="family-name"
                    // value={checkOut}
                    onChange={handleChange}
                  />
                </Grid>{" "}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Center
              </Button>
            </form>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default AddCenter;
