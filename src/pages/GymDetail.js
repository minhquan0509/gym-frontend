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
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/detail.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SimpleImageSlider from "react-simple-image-slider";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

function GymDetail() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [room, setRoom] = useState({});
  const [selectedImage, setSelectedImage] = useState(
    room.Images ? room.Images[0].image : ""
  );
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [imageForFullscreen, setImageForFullscreen] = useState();

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/rooms/${id}`);
      setRoom(response.data.data.room);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (room) {
      setSelectedImage(room.Images ? room.Images[0].image : ""); // Set the other state based on the API data
    }
  }, [room]);

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

  const handleInactive = async () => {
    await axios.post(`http://localhost:3001/rooms/${id}/inactive`, {}, {
      headers: {
        "Authorization": "Bearer " + token
      },
    });
    fetchData();
  }

  const handleActive = async () => {
    await axios.post(`http://localhost:3001/rooms/${id}/active`, {}, {
      headers: {
        "Authorization": "Bearer " + token
      },
    });
    fetchData()
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const handleSetSelectedImage = (image) => {
    setSelectedImage(image);
  };
  return (
    <>
      <Header />
      <img
        src={"http://" + imageForFullscreen}
        style={{
          height: "80%",
          width: "60%",
          objectFit: "cover",
          position: "fixed",
          top: "50%",
          right: "50%",
          transform: "translate(50%,-50%)",
          display: fullscreen ? "block" : "none",
          zIndex: 30,
        }}
        alt="preview"
      />
      <CloseIcon
        style={{
          cursor: "pointer",
          position: "fixed",
          right: "20px",
          top: "10px",
          zIndex: 40,
          display: fullscreen ? "block" : "none",
        }}
        fontSize="large"
        onClick={() => {
          setFullscreen(false);
        }}
      />
      <Grid
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#eeeeee",
          zIndex: 20,
          opacity: fullscreen ? 0.9 : 0,
          display: fullscreen ? "block" : "none",
        }}
      ></Grid>
      <Container
        style={{ paddingTop: "80px", minHeight: "calc( 100vh - 240px )" }}
        fixed
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Zoom>
              {room.Images && room.Images.map((image, index) => (
                <div
                  className="each-slide-effect"
                  style={{ width: "100%" }}
                  onClick={() => {
                    setImageForFullscreen(selectedImage);
                    setFullscreen(true);
                  }}
                >
                  <img
                    src={"http://" + image.image}
                    style={{ height: "400px", width: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </Zoom>
            <div style={{ display: 'flex', marginBottom: '50px' }} className="">
              {
                room.Images && room.Images.map((image, index) => (
                  <div className="" style={{ width: '100%', padding: '10px' }}>
                    <img
                      src={'http://' + image.image}
                      style={{ width: '100%', height: '100%', margin: '0 5px', cursor: 'pointer' }}
                    />
                  </div>
                ))
              }
            </div>
          </Grid>
          <Grid item xs={8} style={{ margin: "50px 0", paddingLeft: "50px" }}>
            <Typography variant="h3">ルームジム情報</Typography>
            <Typography ml={50} variant="subtitle1" gutterBottom>
              {room.lastLogin
                ? "Owner last login: " +
                new Date(room.lastLogin).toLocaleString()
                : ""}
            </Typography>
            <Typography variant="h6" mt={2}>
              Rating:{" "}
              {room.rating ? (
                <Rating name="read-only" value={room.rating} readOnly />
              ) : (
                "未登録"
              )}
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
              - 電話番号: {room.phone ? room.phone : ''}
            </Typography>
            <Typography variant="h6" mt={2} mb={2}>
              - 登録価格: {room.price}
            </Typography>
            <Typography variant="h6" mt={2} mb={2}>
              - サービス: {room.pool ? 'プール' : ''}, {room.sauna ? 'サウナ室' : ''}, {room.parking ? '駐車場' : ''}
            </Typography>
            <Link to={`review`}>
              <Button variant="contained">レビューを表示して書く</Button>
            </Link>
          </Grid>
        </Grid>
        {user && user.id === room.owner_id && (
          <div className="owner-button">
            <Button
              variant="contained"
              color="error"
              onClick={handleOpen}
              className="button-delete"
            >
              Xóa
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
                  Hủy
                </Button>
                <Button onClick={handleDelete} autoFocus className="button">
                  Xóa
                </Button>
              </DialogActions>
            </Dialog>
            <Link to={`editgym`}>
              <Button
                variant="contained"
                color="success"
                onClick={handleOpen}
                className="button"
              >
                Sửa
              </Button>
            </Link>
            {room.status ?
              <Button onClick={handleInactive} variant="contained" className="button-delete">
                Tạm ngừng hoạt động
              </Button>
              :
              <Button onClick={handleActive} variant="contained" className="button-delete">
                Hoạt động
              </Button>
            }
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default GymDetail;