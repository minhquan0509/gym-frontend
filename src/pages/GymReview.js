import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { Container, Typography, TextField } from "@mui/material";
import ReviewForm from "../components/Review/ReviewForm";
import SampleReview from "../components/Review/SampleReview";
import axios from "axios";
import { useState } from "react";

function GymReview() {
  const { id } = useParams();
  const [pool, setPool] = useState(false);

  // async function getPool() {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/rooms/${id}`);
  //     if (res.data.data.room.pool) {
  //       console.log(res.data.data.room.pool);
  //       setPool(true);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  // getPool();

  return (
    <>
      <Container style={{ paddingTop: "80px" }} fixed>
        <Typography variant="h5">ルームジム{id}レビュー</Typography>
        {/* <TextField placeholder="Review" multiline rows={4} fullWidth /> */}
        <ReviewForm pool={pool} />
        <SampleReview pool={pool} />
      </Container>
    </>
  );
}

export default GymReview;
