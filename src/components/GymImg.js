import React, { useState } from "react";
import { Grid, Card, CardMedia } from "@mui/material";

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia component="img" src={selectedImage} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          {images.map((image, index) => (
            <Grid item xs={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  src={image}
                  onClick={() => handleImageClick(image)}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductGallery;
