import { useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import { Container, Typography, TextField, Grid, Select, MenuItem, Button, InputLabel, FormControl, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import GymCard from '../components/GymCard'
import axios from 'axios'
import Footer from '../components/footer/Footer'

function SearchPage() {
  const { id } = useParams()
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState([]);
  const [price, setPrice] = useState();
  const [rooms, setRooms] = useState([])

  const fetchData = async () => {
    try {
      const params = {
        name: name,
        address: address
      };
      const pool = service.includes('pool');
      const sauna = service.includes('sauna');
      const parking = service.includes('parking');
      if(pool) params['service[pool]'] = true;
      if(sauna) params['service[sauna]'] = true;
      if(parking) params['service[parking]'] = true;

      // const response = await axios.get(`${process.env.REACT_APP_API_URL}/rooms?name=${name}&address=${address}&service[pool]=${pool}&service[sauna]=${sauna}&service[parking]=${parking}&priceMin=${price ? price.priceMin : ''}&priceMax=${price ? price.priceMax : ''}`);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/rooms`, {
        params
      });
      console.log(response.data.data.rooms)
      await setRooms(response.data.data.rooms)
      console.log('rooms:', rooms)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSearch = () => {
    fetchData()
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleChangeService = (event) => {
    const {
      target: { value },
    } = event;
    setService(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleChangePrice = (event) => {
    setPrice(event.target.value)
  }

  return (
    <>
      <Header />
      <Container style={{ paddingTop: '80px', minHeight: 'calc( 100vh - 240px )' }} fixed>
        <Typography variant="h5">検索</Typography>
        <TextField placeholder="名前" rows={1} fullWidth onChange={handleChangeName} />
        <Grid container spacing={3} marginTop={'20px'}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">住所</InputLabel> */}
              <TextField placeholder="住所" rows={1} fullWidth onChange={handleChangeAddress} />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">価格</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={price}
                label="Price"
                onChange={handleChangePrice}
                style={{ minWidth: '200px' }}
                renderValue={(price) => (`${price.priceMin} ${price.priceMax ? '- ' + price.priceMax : '以上'}`)}
              >
                <MenuItem value={{ priceMin: 100000, priceMax: 300000 }} >100k-300k</MenuItem>
                <MenuItem value={{ priceMin: 300000, priceMax: 500000 }} >300k-500k</MenuItem>
                <MenuItem value={{ priceMin: 500000, priceMax: '' }} >500k 以上</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">サービス</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={service}
                label="Service"
                multiple
                onChange={handleChangeService}
                style={{ minWidth: '200px' }}
              >
                <MenuItem value={'pool'}>プール</MenuItem>
                <MenuItem value={'sauna'}>サウナ室</MenuItem>
                <MenuItem value={'parking'}>駐車場</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" style={{ height: '100%', minWidth: '160px', float: 'right' }} onClick={handleSearch}>検索</Button>
          </Grid>
          {rooms.length === 0 ?
            <Grid item xs={4}>
              <Typography>結果がありません。</Typography>
            </Grid>
            :
            rooms.map((item) => (
              <Grid item xs={4}>
                <GymCard room={item} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default SearchPage
