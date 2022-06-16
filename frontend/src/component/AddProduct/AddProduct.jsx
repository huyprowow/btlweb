import React, { useEffect, useState } from 'react'
import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { makeStyles, createStyles } from '@mui/styles';
import { Box } from '@mui/system';
import httpUploadBase from '../../utils/http-upload-base';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import PointLeftBg from '../../assets/pointLeft.png';
import "./style.scss"

const useStyles = makeStyles((theme) =>
  createStyles({
    // root: {
    //   '& > *': {
    //     margin: theme.spacing(1),
    //   },
    // },
    input: {
      display: 'none',
    },
  }),
);
const AddProduct = () => {
  const classes = useStyles();
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)
  const [type, setType] = useState('')
  const [error, setError] = useState([])
  // const [successMsg, setSuccessMsg] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState()
  const navigate = useNavigate();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [image])
  const handleChange = (prop) => (event) => {
    const { value, checked, files } = event.target
    switch (prop) {
      case 'image':
        setImage(files[0])
        break;
      case 'name':
        setName(value)
        break;
      case 'number':
        setNumber(Number(value))
        break;
      case 'price': {
        if (!isNaN(value)) {
          setPrice(value)
        }
        break;
      }
      case 'description':
        setDescription(value)
        break;
      case 'status':
        setStatus(checked)
        break;
      case 'type':
        setType(value)
        break;
      default:
        break;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(number, Number(price)!==0?Number(0):"", description, status, type, image, name);
    setIsLoading(true)
    httpUploadBase.post('/product/add', {
      name,
      number,
      price,
      description,
      status,
      type,
      image,
    }).then(res => {
      console.log(res.data);
      if (res.status === 201) {
        setIsLoading(false);
        navigate("/success");
        // del dung dc do up load file len thu muc o frontend nen no reload :v neu day len ec2 cua amazon thi lai ngon r :v 
        // setSuccessMsg(res.data.message);
      }
      setIsLoading(false);
    }).catch(err => {
      console.log(err.response?.data);
      if (err.response?.data) {
        let errList = err.response?.data;
        let errMsgList = errList.errors.map((err) => err.msg);
        setError(errMsgList);
        setIsLoading(false);
      }
    })
  }
  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} height={"100vh"} bgcolor={"#faf0e6"}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{
          padding: '1rem',
          maxWidth: '500px',
        }}
          elevation={3}
        >
          <Typography variant="h5" component="h5" textAlign={"center"} fontFamily={"Quicksand"}>
            Do you want add some thing new?
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              required
              id="standard-required"
              label="Product Name"
              variant="standard"
              value={name}
              onChange={handleChange('name')}
            />
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Type"
              variant="standard"
              value={type}
              onChange={handleChange('type')}
            />
          </Stack>
          <Stack direction="row" spacing={2}>

            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="standard-adornment-number">Number*</InputLabel>
              <Input
                required
                id="standard-adornment-number"
                value={number}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={handleChange('number')}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="standard-adornment-price">Price*</InputLabel>
              <Input
                required
                id="standard-adornment-price"
                value={price}
                onKeyPress={(event) => {
                  if (!/^([0-9]{1,})?(\.)?([0-9]{1,})?$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={handleChange('price')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} >
            <TextField
              sx={{
                width: '100%',
              }}
              id="standard-multiline-description"
              label="Description?..."
              multiline
              rows={6}
              variant="standard"
              value={description}
              onChange={handleChange('description')}
            />
            <Stack direction="column" spacing={2} sx={{
              width: '100%',
            }} >
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <FormControlLabel control={<Checkbox defaultChecked value={status} onChange={handleChange("status")} />} label="OnSale?" />
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={handleChange('image')}
                />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <AddAPhotoIcon />
                  </IconButton>
                </label>
              </Box>
              {image && <img src={preview} alt="Preview" width={200} height={100} />}
            </Stack>
          </Stack>
          {/* <Stack direction="row" spacing={2}>*/}
          <Grid container>
            <Grid item xs={10}>
              {error && error.map((err) => <span className="msg-error">{err}<ClearIcon fontSize="sm" /></span>)}
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="success"
                id="btn"
                onClick={handleSubmit}>
                {isLoading ? <CircularProgress size={24.5} color="success" /> : "Add"}
              </Button>
            </Grid>
          </Grid>
          {/* // </Stack> */}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={5} sx={{
        display: {
          xs:"none",sm: 'inline',
        }
      }}>
        <img
          src={PointLeftBg}
          alt="pointleftbg"
          loading="lazy"
          width={'100%'}
        />
      </Grid>
    </Stack>
  )
}

export default AddProduct