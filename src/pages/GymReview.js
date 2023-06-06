import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { Container, Typography, TextField } from "@mui/material";
import ReviewForm from "../components/Review/ReviewForm";
import SampleReview from "../components/Review/SampleReview";

function GymReview() {
  const { id } = useParams();

  return (
    <>
      <Container style={{ paddingTop: "80px" }} fixed>
        <Typography variant="h5">ルームジム{id}レビュー</Typography>
        {/* <TextField placeholder="Review" multiline rows={4} fullWidth /> */}
        <ReviewForm />
        <SampleReview />
      </Container>
    </>
  );
}

export default GymReview;
