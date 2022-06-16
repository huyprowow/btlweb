import { useEffect, useState } from "react";
import http from "../../utils/http-base";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { TextField, Container, Typography, Grid, InputAdornment, IconButton, FormControl, InputLabel, Input, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SignUpBg from "../../assets/signupbg.png";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
 import "./style.scss"
const SignUpPage = () => {
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const isSigned = localStorage.getItem("token1");
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (isSigned) {
            navigate("/");
        }
    });

    const handleChange = (e) => {
        e.preventDefault();
        setError([]);
        const { name, value } = e.target;
        if (name === "userName") {
            setUserName(value);
        } else if (name === "password") {
            setPassword(value);
        }
        else {
            setEmail(value);
        }
    };
    const handleSignUp = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const newAcc = { email, userName, password };
        console.log(newAcc)
        http
            .post("/accounts/signup", newAcc)
            .then((res) => {
                console.log(res.data);
                if (res.status === 201) {
                    setIsLoading(false);
                    setSuccessMsg(res.data.message);
                    setTimeout(() => {
                        navigate("/success");
                    }, 1850);

                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response?.data);
                if (err.response?.data) {
                    let errList = err.response?.data;
                    let errMsgList = errList.errors.map((err) => err.msg);
                    setError(errMsgList);
                    setIsLoading(false);
                }
            });
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item sm={7} sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#faf0e6',
            }} >
                <Container sx={{
                    display: { xs: 'none', sm: 'flex' },
                    justifyContent: 'center',
                }}>
                    <img
                        src={SignUpBg}
                        alt="signupbg"
                        loading="lazy"
                    />
                </Container>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ display: 'flex', alignItems: 'center' }}>
                <Container id="form" sx={{
                    width: 300,
                    height: 400,
                }}>
                    <Typography variant="h4" component="span" id="title" gutterBottom>
                        SignUp
                    </Typography>
                    <TextField
                        required
                        fullWidth={true}
                        className="outlined-required"
                        id="Email"
                        label="Email"
                        name="email"
                        variant="standard"
                        value={email}
                        type="email"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth={true}
                        className="outlined-required"
                        id="Username"
                        label="UserName"
                        name="userName"
                        variant="standard"
                        value={userName}
                        onChange={handleChange}
                    />
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password *</InputLabel>
                        <Input
                            required
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    //   onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {error && error.map((err) => <span className="msg-error">{err}<ClearIcon fontSize="sm" /></span>)}
                    {successMsg && <span className="msg-success">{successMsg}<CheckIcon fontSize="sm" /></span>}
                    <Button
                        variant="outlined"
                        color="success"
                        id="btn"
                        onClick={handleSignUp}>
                       {isLoading?<CircularProgress size={24.5} color="success" />: "SignUp"}
                    </Button>
                </Container>
            </Grid>
        </Grid >
    );
};
export default SignUpPage;
