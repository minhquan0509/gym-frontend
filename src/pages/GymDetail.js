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
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/detail.css";

function GymDetail() {
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

  return (
    <>
      <Container style={{ paddingTop: "80px" }} fixed>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                ホーム
              </Link>
              <Link color="inherit" href="/">
                カテゴリー
              </Link>
              <Typography color="text.primary">ルームジム情報</Typography>
            </Breadcrumbs>
            {selectedImage !== '' && <img src={'http://' + selectedImage} alt="Selected Product" style={{ maxWidth: '500px', height: '400px', width: 'auto', objectFit: 'cover' }} />}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', float: 'left' }}>
              {room.Images ? room.Images.map((item, index) => (
                <img
                  key={index}
                  src={'http://' + item.image}
                  alt={`Product ${index + 1}`}
                  style={{ width: '50px', height: '50px', margin: '0 5px', cursor: 'pointer', border: item.image === selectedImage ? '2px solid blue' : 'none' }}
                  onClick={() => handleImageClick(item.image)}
                />
              )) : null}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">ルームジム情報</Typography>
            <Typography variant="h6" mt={2}>
              Rating: {room.rating ? room.rating : "未登録"}
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
              <Button variant="contained">{room.name}についてのレビューを表示して書く</Button>
            </Link>
          </Grid>
        </Grid>
        <div className="owner-button">
          <Button variant="outlined" color="error" onClick={handleOpen} className="button-delete">
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
            <Button variant="outlined" color="success" onClick={handleOpen} className="button">
              編集
            </Button>
          </Link>

        </div>
      </Container>
    </>
  );
}

export default GymDetail;
