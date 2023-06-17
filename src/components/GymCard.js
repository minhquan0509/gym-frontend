import * as React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material'
import { Link } from 'react-router-dom'
import '../css/GymCard.css'

export default function GymCard(props) {
  const { room } = props
  if (!room) return <div>Loading...</div>

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={room.Images && room.Images.length ? 'http://' + room.Images[0].image : "https://cali.vn/storage/app/media/2021/Club/HO%20CHI%20MINH/VVO/HCM_VVO_900x600.jpg"}
        />
        {room.pool &&
          <div className='card-havepool'>
            プール
          </div>
        }

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
            ジムルーム詳細
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card >
  )
}
