import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "../css/addGym.css";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useForm, Controller } from "react-hook-form";
import addGymSchema from "../validation/addGym";
import { yupResolver } from "@hookform/resolvers/yup";

function AddGym() {
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      ownerName: "",
      email: "",
      name: "",
      address: "",
      phone: "",
      price: "",
    },
    resolver: yupResolver(addGymSchema),
  });
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
  const [service, setService] = useState([]);
  const names = ["Hồ bơi", "Xông hơi", "Bãi đỗ xe"];
  const [formData, setFormData] = useState();

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
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          imageUrls.push(reader.result);
          if (imageUrls.length === files.length) {
            setSelectedImages(imageUrls);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  const handleAddGym = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3001/rooms/${id}`,
        formData
      );
      console.log(res.data);
      // Thực hiện các hành động khác sau khi cập nhật thành công
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-gym">
      <div className="img">
        {selectedImages.length > 0 ? (
          <>
            {selectedImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Selected ${index + 1}`}
                style={{
                  width: "300px",
                  height: "300px",
                  marginRight: "10px",
                  marginTop: "50px",
                }}
              />
            ))}
            <div>
              <IconButton
                ref={fileInputRef}
                color="primary"
                onClick={handleAddIconClick}
              >
                <label htmlFor="upload-images">
                  <AddCircleOutlineIcon />
                </label>
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <IconButton color="primary" onClick={handleAddIconClick}>
              <label htmlFor="upload-images">
                <AddCircleOutlineIcon fontSize="large" />
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
            </IconButton>
            <span>Chọn ảnh</span>
          </>
        )}
      </div>
      <div className="form">
        <span className="title">Đăng kí thông tin phòng gym</span>
        <form onSubmit={handleSubmit(handleAddGym)}>
          <div className="input-item">
            <div className="label">Tên chủ phòng gym</div>
            <Controller
              name="ownerName"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <input
                  {...rest}
                  className={`input ${
                    errors.ownerName?.message ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.ownerName?.message && (
              <div className="error">{errors.ownerName.message}</div>
            )}
            {/* value = {room.ownerName} ???? error*/}
          </div>
          <div className="input-item">
            <div className="label">Email</div>
            <Controller
              name="email"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <input
                  {...rest}
                  className={`input ${
                    errors.email?.message ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.email?.message && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>
          <div className="input-item">
            <div className="label">Tên phòng gym</div>
            <Controller
              name="name"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <input
                  {...rest}
                  className={`input ${
                    errors.name?.message ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.name?.message && (
              <div className="error">{errors.name.message}</div>
            )}
          </div>
          <div className="input-item">
            <div className="label">Địa chỉ</div>
            <Controller
              name="address"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <input
                  {...rest}
                  className={`input ${
                    errors.address?.message ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.address?.message && (
              <div className="error">{errors.address.message}</div>
            )}
          </div>
          <div className="input-item">
            <div className="label">Số điện thoại</div>
            <Controller
              name="phone"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <input
                  {...rest}
                  className={`input ${
                    errors.phone?.message ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.phone?.message && (
              <div className="error">{errors.phone.message}</div>
            )}
          </div>
          <div className="input-item">
            <div className="label">Mức giá 1 tháng (vnđ)</div>
            <Controller
              name="price"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <input
                  {...rest}
                  className={`input ${
                    errors.price?.message ? "input-error" : ""
                  }`}
                />
              )}
            />
            {errors.price?.message && (
              <div className="error">{errors.price.message}</div>
            )}
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
        </form>
      </div>
    </div>
  );
}

export default AddGym;
