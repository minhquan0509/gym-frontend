import { useState, useEffect } from "react";
import GymCard from "../components/GymCard";
import { Container, Grid, Pagination } from "@mui/material";
import axios from "axios";
import SimpleImageSlider from 'react-simple-image-slider'
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function Homepage() {
  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rooms.slice(indexOfFirstItem, indexOfLastItem);

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
  });

  useEffect(() => {
    if (rooms.length > 0)
      setImages(getImageListFromRooms(rooms))
  }, [rooms]);

  const getImageListFromRooms = (rooms) => {
    return rooms.map(item => item.Images[0] ? 'http://' + item.Images[0].image : '');
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />

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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ minHeight: '500px', marginBottom: '20px' }}>
          {currentItems.map((item) => (
            <Grid item xs={4}>
              <GymCard room={item} />
            </Grid>
          ))}
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <Pagination
            count={Math.ceil(rooms.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Homepage;
