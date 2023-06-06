import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Container, Typography, TextField } from "@mui/material";

function GymReview() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <Container style={{ paddingTop: "80px" }} fixed>
        <Typography variant="h5">ルームジム{id}レビュー</Typography>
        <TextField placeholder="Review" multiline rows={4} fullWidth />
      </Container>
    </>
  );
}

export default GymReview;
