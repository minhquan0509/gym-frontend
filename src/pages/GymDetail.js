import {
  Button,
  Container,
  Grid,
  CardMedia,
  Typography,
  DialogActions,
  DialogTitle,
  Dialog,
  Breadcrumbs,
  Rating
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/detail.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SimpleImageSlider from 'react-simple-image-slider';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useSelector } from "react-redux";

function GymDetail() {
  const user = useSelector(state => state.auth.user);
  const [room, setRoom] = useState({});
  const [selectedImage, setSelectedImage] = useState(room.Images ? room.Images[0].image : '');
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rooms/${id}`);
        setRoom(response.data.data.room);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (room) {
      setSelectedImage(room.Images ? room.Images[0].image : ''); // Set the other state based on the API data
    }
  }, [room])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    //Xoa room
    setOpen(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const handleSetSelectedImage = (image) => {
    setSelectedImage(image);
  }
  return (
    <>
      <Header />
      <Container style={{ paddingTop: "80px", minHeight: 'calc( 100vh - 240px )' }} fixed>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Zoom
              indicators={
                () => (
                  <img
                    src={'http://' + selectedImage}
                    alt="Selected Product"
                    style={{ width: '50px', height: '50px', margin: '0 5px', cursor: 'pointer' }}
                  />
                )
              }
              scale={1.4}>
              <div className="each-slide-effect" style={{ width: '100%' }}>
                <img
                  src={'http://' + selectedImage}
                  style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="each-slide-effect" style={{ width: '100%' }}>
                <img
                  src={'http://' + selectedImage}
                  style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="each-slide-effect" style={{ width: '100%' }}>
                <img
                  src={'http://' + selectedImage}
                  style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            </Zoom>

          </Grid>
          <Grid item xs={8} style={{ margin: "50px 0", paddingLeft: "50px" }}>
            <Typography variant="h3">ルームジム情報</Typography>
            <Typography ml={50} variant="subtitle1" gutterBottom>
              {room.lastLogin ? 'Owner last login: ' + new Date(room.lastLogin).toLocaleString() : ''}
            </Typography>
            <Typography variant="h6" mt={2}>
              Rating: {room.rating ? 
              <Rating name="read-only" value={room.rating} readOnly /> : "未登録"}
            </Typography>
            <Typography variant="h6" mt={2}>
              - ジム名: {room.name}
            </Typography>
            <Typography variant="h6" mt={2}>
              - 住所: {room.address}
            </Typography>
            <Typography variant="h6" mt={2}>
              - ジムオーナー: {room.ownerName}
            </Typography>
            <Typography variant="h6" mt={2}>
              - 電話番号
            </Typography>
            <Typography variant="h6" mt={2} mb={2}>
              - 登録価格: {room.price}
            </Typography>
            <Link to={`review`}>
              <Button variant="contained">レビューを表示して書く</Button>
            </Link>
          </Grid>
        </Grid>
        { user && user.id === room.owner_id &&
        <div className="owner-button">
          <Button variant="contained" color="error" onClick={handleOpen} className="button-delete">
            削除
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"このジムルームを削除することを確認しますか?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} className="button-delete">
                キャンセル
              </Button>
              <Button onClick={handleDelete} autoFocus className="button">
                削除する
              </Button>
            </DialogActions>
          </Dialog>
          <Link to={`editgym`}>
            <Button variant="contained" color="success" onClick={handleOpen} className="button">
              編集
            </Button>
          </Link>
        </div>
        }
      </Container >
      <Footer />
    </>
  );
}

export default GymDetail;
