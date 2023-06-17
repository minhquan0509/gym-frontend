import React, { useState } from "react";
import { TextField, Button, Rating, IconButton } from "@mui/material";
import "../../css/review.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function ReviewForm(props) {
  const havePool = props.pool;
  const [rating, setRating] = useState(0);
  const [ratingPool, setRatingPool] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImages] = useState([]);
  const { id } = useParams();

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleRatingPoolChange = (event, value) => {
    setRatingPool(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImages = [];
    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);
    }
    setImages(selectedImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Xử lý submit review
    console.log("Rating:", rating);
    console.log("Rating Pool:", ratingPool);
    console.log("Comment:", comment);
    console.log("Selected File:", image);

    // try {
    //   const res = await axios.post("http://localhost:3001/rooms/review", {
    //     id,    //id room
    //     userId,
    //     rating,
    //     ratingPool,
    //     comment,
    //     images,
    //   });
    //   setComment("");
    //   setImages([]);
    //   setRating();
    //   setRatingPool();
    // } catch (error) {
    //   console.log(error);
    // }

    setComment("");
    setImages([]);
    setRating();
    setRatingPool();
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      {havePool ? (
        <div>
          <TextField
            label="コメントを入力してください。"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            className="review-input"
            InputProps={{
              endAdornment: (
                <>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                    precision={0.5}
                    className="review-rating"
                  />
                  <IconButton component="label" className="review-img">
                    <AttachFileIcon />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </IconButton>
                </>
              ),
            }}
          />
          {image && (
            <div>
              <img src={image} alt="Selected Image" width="200" />
            </div>
          )}
          <div className="rating-pool">
            <label>プール：</label>
            <Rating
              name="rating-pool"
              value={ratingPool}
              onChange={handleRatingPoolChange}
              precision={0.5}
              className="review-rating"
            />
          </div>
        </div>
      ) : (
        <div>
          <TextField
            label="コメントを入力してください。"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            className="review-input"
            InputProps={{
              endAdornment: (
                <>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                    precision={0.5}
                    className="review-rating"
                  />
                  <IconButton component="label">
                    <AttachFileIcon />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      className="review-img"
                    />
                  </IconButton>
                </>
              ),
            }}
          />
          {image && (
            <div>
              <img src={image} alt="Selected Image" width="200" />
            </div>
          )}
        </div>
      )}
      <Button variant="contained" type="submit" className="review-submit-btn">
        レビュー
      </Button>
    </form>
  );
}

export default ReviewForm;
