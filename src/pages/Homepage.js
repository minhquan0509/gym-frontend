import { useState, useEffect } from "react";
import GymCard from "../components/GymCard";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import SimpleImageSlider from 'react-simple-image-slider'

function Homepage() {
  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rooms/`);
        console.log(response.data.data.rooms);
        await setRooms(response.data.data.rooms);
        console.log("rooms:", rooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(rooms.length > 0)
      setImages(getImageListFromRooms(rooms))
  }, [rooms]);

  const getImageListFromRooms = (rooms) => {
    return rooms.map(item => item.Images[0] ? 'http://' + item.Images[0].image : '');
  }

  return (
    <>
      <Container style={{ paddingTop: "80px" }}>
        <Grid container
          style={{ marginBottom: '40px' }}
          direction="row"
          justifyContent="center"
          sx={{ minHeight: '200px' }}
        >
          {images.length > 0 &&
            <SimpleImageSlider
              width={800}
              height={470}
              images={images}
              showNavs
              showBullets
            />
          }
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {rooms.map((item) => (
            <Grid item xs={4}>
              <GymCard room={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Homepage;
