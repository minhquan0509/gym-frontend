import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "../css/addGym.css";
import { Button, IconButton, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useForm, Controller } from "react-hook-form";
import addGymSchema from "../validation/addGym";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

function AddGym() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const theme = useTheme();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [noti, setNoti] = useState("");

  const [service, setService] = useState([]);
  const names = ["Hồ bơi", "Xông hơi", "Bãi đỗ xe"];

  function getStyles(name, service, theme) {
    return {
      fontWeight:
        service.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(typeof value === "string" ? value.split(",") : value);
  };

  // Select ảnh
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    // setSelectedImages([...event.target.files]);
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    setPreviewImage(selectedImages[0]);
  }, [selectedImages]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  const handleAddGym = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i]);
    }
    formData.append("name", name);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("owner_id", user.id);
    formData.append("pool", service.includes("Hồ bơi"));
    formData.append("sauna", service.includes("Xông hơi"));
    formData.append("parking", service.includes("Bãi đỗ xe"));
    try {
      const res = await axios.post(`http://localhost:3001/rooms/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      setNoti("Added successfully")
      setTimeout(() => {
        navigate('/');
      }, 1000)
      // Thực hiện các hành động khác sau khi cập nhật thành công
    } catch (error) {
      console.log(error);
    }
  };

  const removeSelectedImage = (index) => {
    if (index > -1) {
      let temp = [...selectedImages];

      temp.splice(index, 1);

      setSelectedImages(temp);
    }
  };

  return (
    <div className="add-gym">
      <div className="img-section">
        <div className="img-preview">
          {previewImage && (
            <img
              src={previewImage}
              alt="img-preview"
              width={450}
              height={450}
            />
          )}
        </div>
        {selectedImages.length > 0 ? (
          <>
            <div className="img-slider">
              <div className="img-list">
                {selectedImages.map((imageUrl, index) => (
                  <div
                    className={`thumbnail ${
                      imageUrl === previewImage ? "selected" : ""
                    }`}
                    key={index}
                  >
                    <div
                      className="x-icon"
                      onClick={() => {
                        removeSelectedImage(index);
                      }}
                    ></div>
                    <img
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      width={50}
                      height={50}
                      onClick={() => {
                        setPreviewImage(imageUrl);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="img-upload">
                <label htmlFor="upload-images">
                  <IconButton color="primary" onClick={handleAddIconClick}>
                    <AddCircleOutlineIcon fontSize="large" />
                  </IconButton>
                </label>

                <input
                  id="upload-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="image-upload">
              <label htmlFor="upload-images">
                <IconButton color="primary" onClick={handleAddIconClick}>
                  <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
                <span>Chọn ảnh</span>
              </label>

              <input
                id="upload-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </>
        )}
      </div>
      <div className="form">
        <span className="title">Đăng kí thông tin phòng gym</span>
        <form onSubmit={handleAddGym}>
          <div className="input-item">
            <div className="label">Tên chủ phòng gym</div>
            <input className={`input`} />
            {/* value = {room.ownerName} ???? error*/}
          </div>
          <div className="input-item">
            <div className="label">Email</div>
            <input type="text" className={`input`} />
          </div>
          <div className="input-item">
            <div className="label">Tên phòng gym</div>
            <input
              type="text"
              className={`input`}
              onChange={handleChangeName}
            />
          </div>
          <div className="input-item">
            <div className="label">Địa chỉ</div>
            <input
              type="text"
              className={`input`}
              onChange={handleChangeAddress}
            />
          </div>
          <div className="input-item">
            <div className="label">Số điện thoại</div>
            <input type="number" className={`input`} />
          </div>
          <div className="input-item">
            <div className="label">Mức giá 1 tháng (vnđ)</div>
            <input
              type="number"
              className={`input`}
              onChange={handleChangePrice}
            />
          </div>
          <div className="service">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Dịch vụ</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={service}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Dịch vụ" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, service, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button className="button" type="submit">
            Đăng kí
          </Button>
          {noti && <Alert severity="success">{noti}</Alert>}
        </form>
      </div>
    </div>
  );
}

export default AddGym;
