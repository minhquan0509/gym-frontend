import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { Container, Typography, TextField } from "@mui/material";
import ReviewForm from "../components/Review/ReviewForm";
import SampleReview from "../components/Review/SampleReview";
import Footer from "../components/footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

function GymReview() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [havePool, setHavePool] = useState(false);

  const fetchComment = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/rooms/${id}/reviews`);
      setReviews(response.data.data.reviews);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [id]);

  useEffect(() => {
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
  }, [])

  return (
    <>
      <Header />
      <Container style={{ paddingTop: "80px" }} fixed>
        <Typography variant="h5">ルームジム{id}レビュー</Typography>
        {/* <TextField placeholder="Review" multiline rows={4} fullWidth /> */}
        <ReviewForm havePool={havePool} fetchComment={fetchComment}/>
        {
          reviews.map(item => (<SampleReview review={item} havePool={havePool}/>))
        }
        
      </Container>
      <Footer />
    </>
  );
}

export default GymReview;
