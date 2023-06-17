import React, { useState } from "react";
import { TextField, Button, Rating } from "@mui/material";
import "../../css/review.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import AttachFileIcon from '@mui/icons-material/AttachFile';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [ratingPool, setRatingPool] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [havePool, setHavePool] = useState(false);
  const { id } = useParams();

  async function getPool() {
    try {
      const res = await axios.get(`http://localhost:3001/rooms/${id}`);
      if (res.data.data.room.pool) {
        setHavePool(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  getPool();

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
    console.log("Selected File:", images);

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
      <div style={{ position: 'relative', }}>
        <TextField
          label="コメントを入力してください。"
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          className="review-input"
        />
        <div className="rating">
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
            className="review-rating"
          />
          <div>
            <label className="form-label label-upload review_upload-icon" htmlFor='review_labelUpload'>
              <AttachFileIcon />
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="review-img"
              id='review_labelUpload'
              hidden
            />
          </div>
        </div>
      </div>

      <div className='rating-pool-btn-submit' >
        {havePool &&
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
        }
        <Button variant="contained" type="submit" className="review-submit-btn">
          レビュー
        </Button>
      </div>
    </form >
  );
}

export default ReviewForm;
