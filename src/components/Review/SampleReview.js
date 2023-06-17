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
      <Box className="review_list-item">
        <div className="review_list-user-content">
          <div className="review_list-user-infor">
            <Avatar src={sampleAvatarUrl} alt="Avatar" className="review_list-user-infor-avatarUser" />
            <div style={{ textAlign: 'center' }} className="review_list-user-infor-name" >名前</div>
            <Rating
              name="sample-rating"
              value={sampleRatingValue}
              readOnly
              size="small"
            />
          </div>
          <Box sx={{ ml: 3 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom>
              きれいなジムです。トレーナーも親切で、いいジムです。
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
          </Box>
        </div>
        <div className="review_list-star-time-react">
          <div>
            {havePool && (
              <div>
                <label>プール：</label>
                <Rating
                  name="sample-rating"
                  value={sampleRatingValue}
                  readOnly
                  size="small" />
              </div>
            )}
            <div>投稿日：2023年6月20日</div>
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
      <Box className="review_list-item">
        <div className="review_list-user-content">
          <div className="review_list-user-infor">
            <Avatar src={sampleAvatarUrl} alt="Avatar" className="review_list-user-infor-avatarUser" />
            <div style={{ textAlign: 'center' }} className="review_list-user-infor-name" >名前</div>
            <Rating
              name="sample-rating"
              value={sampleRatingValue}
              readOnly
              size="small"
            />
          </div>
          <Box sx={{ ml: 3 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom>
              きれいなジムです。トレーナーも親切で、いいジムです。
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
          </Box>
        </div>
        <div className="review_list-star-time-react">
          <div>
            {havePool && (
              <div>
                <label>プール：</label>
                <Rating
                  name="sample-rating"
                  value={sampleRatingValue}
                  readOnly
                  size="small" />
              </div>
            )}
            <div>投稿日：2023年6月20日</div>
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
      <Box className="review_list-item">
        <div className="review_list-user-content">
          <div className="review_list-user-infor">
            <Avatar src={sampleAvatarUrl} alt="Avatar" className="review_list-user-infor-avatarUser" />
            <div style={{ textAlign: 'center' }} className="review_list-user-infor-name" >名前</div>
            <Rating
              name="sample-rating"
              value={sampleRatingValue}
              readOnly
              size="small"
            />
          </div>
          <Box sx={{ ml: 3 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom>
              きれいなジムです。トレーナーも親切で、いいジムです。
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
          </Box>
        </div>
        <div className="review_list-star-time-react">
          <div>
            {havePool && (
              <div>
                <label>プール：</label>
                <Rating
                  name="sample-rating"
                  value={sampleRatingValue}
                  readOnly
                  size="small" />
              </div>
            )}
            <div>投稿日：2023年6月20日</div>
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

      <Stack spacing={2} className="review_list-pagination">
        <Pagination count={10} shape="rounded" />
      </Stack>
    </>
  );
}

export default SampleReview;
