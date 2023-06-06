import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Rating,
  Grid,
  IconButton,
} from "@mui/material";
import ThumbUpAlt from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import "../../css/review.css";
import axios from "axios";
import { useEffect } from "react";

function SampleReview() {
  // useEffect(() => {
  //   async function GetReview() {
  //     try {
  //       const res = await axios.get("");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // });

  const sampleAvatarUrl = "https://example.com/avatar.jpg";
  const sampleText =
    "Phòng Gym thoáng mát, PT nhiệt tình thân thiện giá cả hợp lý!";
  const sampleImageUrl =
    "https://phumyhung.vn/wp-content/uploads/2020/11/Hung-Phuc-Premier-36-Copy.jpg";
  const sampleRatingValue = 4;

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!disliked) {
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    }
  };

  const handleDislike = () => {
    if (!liked) {
      if (disliked) {
        setDislikeCount(dislikeCount - 1);
      } else {
        setDislikeCount(dislikeCount + 1);
      }
      setDisliked(!disliked);
    }
  };

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className="review-item"
      >
        <Avatar src={sampleAvatarUrl} alt="Avatar" className="avatarUser" />
        <Box sx={{ ml: 2 }}>
          <div>Username</div>
          <Rating
            name="sample-rating"
            value={sampleRatingValue}
            readOnly
            size="small"
          />
          <Typography variant="body1" gutterBottom className="review-text">
            {sampleText}
          </Typography>
          <Grid>
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
          </Grid>
          <IconButton
            onClick={handleLike}
            className="like-btn"
            size="small"
            sx={{ color: liked ? "blue" : "gray" }}
          >
            {liked ? (
              <ThumbUpAlt fontSize="small" />
            ) : (
              <ThumbUpOffAltIcon fontSize="small" />
            )}
            <span className="like-count">{likeCount}</span>
          </IconButton>
          <IconButton
            onClick={handleDislike}
            className="like-btn"
            size="small"
            sx={{ color: disliked ? "red" : "gray" }}
          >
            {disliked ? (
              <ThumbDownAltIcon fontSize="small" />
            ) : (
              <ThumbDownOffAltIcon fontSize="small" />
            )}
            <span className="like-count">{dislikeCount}</span>
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className="review-item"
      >
        <Avatar src={sampleAvatarUrl} alt="Avatar" className="avatarUser" />
        <Box sx={{ ml: 2 }}>
          <div>Username</div>
          <Rating
            name="sample-rating"
            value={sampleRatingValue}
            readOnly
            size="small"
          />
          <Typography variant="body1" gutterBottom className="review-text">
            {sampleText}
          </Typography>
          <Grid>
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
          </Grid>
          <IconButton
            onClick={handleLike}
            className="like-btn"
            size="small"
            sx={{ color: liked ? "blue" : "gray" }}
          >
            {liked ? (
              <ThumbUpAlt fontSize="small" />
            ) : (
              <ThumbUpOffAltIcon fontSize="small" />
            )}
            <span className="like-count">{likeCount}</span>
          </IconButton>
          <IconButton
            onClick={handleDislike}
            className="like-btn"
            size="small"
            sx={{ color: disliked ? "red" : "gray" }}
          >
            {disliked ? (
              <ThumbDownAltIcon fontSize="small" />
            ) : (
              <ThumbDownOffAltIcon fontSize="small" />
            )}
            <span className="like-count">{dislikeCount}</span>
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className="review-item"
      >
        <Avatar src={sampleAvatarUrl} alt="Avatar" className="avatarUser" />
        <Box sx={{ ml: 2 }}>
          <div>Username</div>
          <Rating
            name="sample-rating"
            value={sampleRatingValue}
            readOnly
            size="small"
          />
          <Typography variant="body1" gutterBottom className="review-text">
            {sampleText}
          </Typography>
          <Grid>
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
            <img
              src={sampleImageUrl}
              alt="Review Image"
              width="80"
              height="80"
              className="reviewedImg"
            />
          </Grid>
          <IconButton
            onClick={handleLike}
            className="like-btn"
            size="small"
            sx={{ color: liked ? "blue" : "gray" }}
          >
            {liked ? (
              <ThumbUpAlt fontSize="small" />
            ) : (
              <ThumbUpOffAltIcon fontSize="small" />
            )}
            <span className="like-count">{likeCount}</span>
          </IconButton>
          <IconButton
            onClick={handleDislike}
            className="like-btn"
            size="small"
            sx={{ color: disliked ? "red" : "gray" }}
          >
            {disliked ? (
              <ThumbDownAltIcon fontSize="small" />
            ) : (
              <ThumbDownOffAltIcon fontSize="small" />
            )}
            <span className="like-count">{dislikeCount}</span>
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default SampleReview;
