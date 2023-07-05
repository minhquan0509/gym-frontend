import {
  Button,
  Container,
  Grid,
  CardMedia,
  Typography,
  DialogActions,
  DialogTitle,
  Dialog,
  Breadcrumbs
} from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/detail.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ReactDOM from 'react-dom';
import AliceCarousel from 'react-alice-carousel';
import SimpleImageSlider from 'react-simple-image-slider';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useSelector } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";


function GymDetail() {
  const user = useSelector(state => state.auth.user);
  const [room, setRoom] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  // const [selectedImage, setSelectedImage] = useState(room.Images ? room.Images[0].image : '');
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
            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '30px' }}>
              <Link color="inherit" href="/">
                ホーム
              </Link>
              <Link color="inherit" href="/">
                カテゴリー
              </Link>
              <Typography color="text.primary">ルームジム情報</Typography>
            </Breadcrumbs>
            <AliceCarousel
              disableDotsControls={true}>
              {room.Images && room.Images.map((image, index) => (
                <div>
                  <img
                    src={'http://' + image.image}
                    style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                  />
                </div>

              ))
              }
            </AliceCarousel>
            <div style={{ display: 'flex', marginBottom: '50px' }} className="">
              {
                room.Images && room.Images.map((image, index) => (
                  <div className="" style={{ width: '100%', padding: '10px' }}>
                    <img
                      src={'http://' + image.image}
                      style={{ width: '100%', height: '100%', margin: '0 5px', cursor: 'pointer' }}
                    // onClick={() => handleImageClick(image.image)}
                    />
                  </div>
                ))
              }
            </div>

          </Grid>
          <Grid item xs={8} style={{ margin: "50px 0", paddingLeft: "50px" }}>
            <Typography variant="h3">ルームジム情報</Typography>
            <Typography variant="h6" mt={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', }} >ジムの評価 &nbsp;&nbsp;&nbsp;<u>{Math.round(room.rating * 10) / 10}</u><StarOutlineIcon style={{ alignSelf: 'center', }} /></div>
              <div style={{ display: 'flex', }}>プールの評価 &nbsp;&nbsp;&nbsp;<u>{room.pool_rating}</u><StarOutlineIcon style={{ alignSelf: 'center', }} /></div>
            </Typography>
            <Typography variant="h6" mt={2} style={{ display: 'flex', justifyContent: 'end' }}>
              <div style={{ display: 'flex', }}>
                <PanoramaFishEyeIcon style={{ color: 'rgb(0, 164, 243)', alignSelf: 'center' }} />&nbsp;
                {user.lastLogin ? user.lastLogin : '2021-10-10'}
              </div>
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
              - 電話番号：
            </Typography>
            <Typography variant="h6" mt={2}>
              - 一ヶ月の登録料金：{room.price}
            </Typography>
            <Typography variant="h6" mt={2} mb={2}>
              - サービス：
              {room.pool ? 'プール　' : ''}
              {room.sauna ? 'スパサウナ室　' : ''}
              {room.parking ? '駐車場　' : ''}

            </Typography>
            <Link to={`review`}>
              <Button variant="contained">レビューを表示して書く</Button>
            </Link>
          </Grid>
        </Grid>
        {user && user.id === room.owner_id &&
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
