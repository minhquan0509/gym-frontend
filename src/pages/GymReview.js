import { useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import { Container, Typography, TextField } from '@mui/material'
import Footer from '../components/footer/Footer'

function GymReview() {
  const { id } = useParams()

  return (
    <>
      <Container style={{ paddingTop: '80px' }} fixed>
        <Typography variant="h5">ルームジム{id}レビュー</Typography>
        <TextField placeholder="Review" multiline rows={4} fullWidth />
      </Container>
    </>
  )
}

export default GymReview
