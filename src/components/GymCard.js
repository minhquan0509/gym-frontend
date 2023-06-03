import * as React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material'
import { Link } from 'react-router-dom'
export default function GymCard(props) {
  const { room } = props

  if (!room) return <div>Loading...</div>

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://cali.vn/storage/app/media/2021/Club/HO%20CHI%20MINH/VVO/HCM_VVO_900x600.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link
              style={{ textDecoration: 'none', color: 'Black' }}
              to={`/gym/${room.id}`}
            >
              {room ? room.name : 'gym'}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ABCD
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
