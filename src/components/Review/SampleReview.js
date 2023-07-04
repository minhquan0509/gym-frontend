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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";

function SampleReview({review, havePool}) {
  const { id } = useParams();
  const date = new Date(review.createdAt).toLocaleString();

  const sampleAvatarUrl = "https://example.com/avatar.jpg";

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
      <Box className="review_list-item">
        <div className="review_list-user-content">
          <div className="review_list-user-infor">
            <Avatar src={sampleAvatarUrl} alt="Avatar" className="review_list-user-infor-avatarUser" />
            <div style={{ textAlign: 'center' }} className="review_list-user-infor-name" >{review.User.name}</div>
            <Rating
              name="sample-rating"
              value={review.rating}
              readOnly
              size="small"
            />
          </div>
          <Box sx={{ ml: 3 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom>
              {review.review}
            </Typography>
            <Grid>
              {review.ReviewImages && review.ReviewImages.map(item => (
                <img
                src={'http://' + item.image}
                alt="Review Image"
                width="80"
                height="80"
                className="reviewedImg"
              />
              ))}
            </Grid>
          </Box>
        </div>
        <div className="review_list-star-time-react">
          <div>
            {havePool && (
              <div>
                <label>プール：</label>
                <Rating
                  name="sample-rating"
                  value={review.PoolRating.rating}
                  readOnly
                  size="small" />
              </div>
            )}
            <div>投稿日：{date}</div>
          </div>
          <div>
            <IconButton
              onClick={handleLike}
              className="review_list-like-btn"
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
              className="review_list-like-btn"
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
          </div>
        </div>
      </Box>

      {/* <Stack spacing={2} className="review_list-pagination">
        <Pagination count={10} shape="rounded" />
      </Stack> */}
    </>
  );
}

export default SampleReview;
