import { useState, useEffect } from 'react'
import GymCard from '../components/GymCard'
import Header from '../components/Header'
import { Container, Grid } from '@mui/material'
import axios from 'axios'

function Homepage() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rooms/`)
        console.log(response.data.data.rooms)
        await setRooms(response.data.data.rooms)
        console.log('rooms:', rooms)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Header />
      <Container style={{ paddingTop: '80px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {rooms.map((item) => (
            <Grid item xs={4}>
              <GymCard room={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Homepage
