import Header from '../components/Header'
import { Button, Container, Grid, CardMedia, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'

function GymDetail() {
  const [room, setRoom] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rooms/${id}`)
        setRoom(response.data.data.room)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <>
      <Header />
      <Container style={{ paddingTop: '80px' }} fixed>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <p>Gym Detail {room.name}</p>
            <CardMedia
              style={{ maxWidth: '500px' }}
              component="img"
              image="https://phumyhung.vn/wp-content/uploads/2020/11/Hung-Phuc-Premier-36-Copy.jpg"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">ルームジム情報</Typography>
            <Typography variant="h6" mt={2}>
              Rating: {room.rating ? room.rating : '未登録'}
            </Typography>
            <Typography variant="h6" mt={2}>
              ジム名: {room.name}
            </Typography>
            <Typography variant="h6" mt={2}>
              住所: {room.address}
            </Typography>
            <Typography variant="h6" mt={2}>
              ジムオーナー: {room.ownerName}
            </Typography>
            <Typography variant="h6" mt={2}>
              電話番号
            </Typography>
            <Typography variant="h6" mt={2}>
              登録価格: {room.price}
            </Typography>
            <Link to={`review`}>
              <Button variant="contained">Go to {room.name} review page</Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default GymDetail
