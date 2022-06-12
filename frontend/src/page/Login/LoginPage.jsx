import { useEffect, useState } from "react";
import http from "../../utils/http-base";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { CircularProgress, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SignUpBg from "../../assets/signupbg.png";
import "./style.scss"

const LoginPage = (props) => {
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isSigned = localStorage.getItem("token1");
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
        } else {
            setPassword(value);
        }
    };
    const handleSignIn = (e) => {
        setIsLoading(true);
        e.preventDefault();
        http
            .post("/accounts/signin", {
                userName: userName,
                password: password,
            })
            .then((res) => {
                const token = res.data.token?.split(" ")[1]; //lay phan sau cua token (sau "Bearer ")
                localStorage.setItem("token1", token); ///! => chac chan co token
               const info=JSON.stringify(res.data.account);
                localStorage.setItem("userInformation",info);
                // console.log(localStorage.getItem("token"));
                setIsLoading(false);
                setSuccessMsg(res.data.message);
                if(res.data.account.role === "admin"){
                    navigate("/admin");
                }else{
                    navigate("/dashboard");
                }
            })
            .catch((err) => {
                if (err.response?.data) {
                    let errList = err.response?.data;
                    let errMsgList = errList.errors.map((err) => err.msg);
                    setIsLoading(false);
                    setError(errMsgList);
                }
            });
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


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
                    height: 400
                }}>
                    <Typography variant="h4" component="span" id="title" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        required
                        fullWidth={true}
                        className="outlined-required"
                        id="demo-helper-text-misaligned"
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
                        onClick={handleSignIn}>
                        {isLoading ? <CircularProgress size={24.5} color="success" /> : "SignUp"}
                    </Button>
                </Container>
            </Grid>
        </Grid >
    );
};
export default LoginPage;
