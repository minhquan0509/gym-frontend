import React, { useEffect, useState } from "react";
import { TextField, Button, Rating } from "@mui/material";
import "../../css/review.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useSelector } from "react-redux";

function ReviewForm({havePool, fetchComment}) {
  const token = useSelector(state => state.auth.token);
  const [rating, setRating] = useState(0);
  const [ratingPool, setRatingPool] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
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
    setImages([...images, ...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Xử lý submit review

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("rating", rating);
    formData.append("poolRating", ratingPool);
    formData.append("review", comment);

    try {
      const res = await axios.post(`http://localhost:3001/rooms/${id}/reviews`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + token
        },
      });
      fetchComment()
    } catch (error) {
      console.log(error);
    }

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
            precision={1}
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
              precision={1}
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
