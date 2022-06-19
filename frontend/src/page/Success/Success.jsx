import React, { useEffect } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Grid, Stack, Typography } from '@mui/material';
import successBg from '../../assets/successbg.png'
import { useNavigate } from 'react-router-dom';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const Success = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }, [])
    return (
        <Grid container
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>

            <Stack >
                <Typography variant="h2" component="span" id="title" gutterBottom
                    sx={{
                        color: '#50C878',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                    Successful
                    <CheckIcon sx={{ fontSize: "56px" }} />
                    <Typography variant='subtitle1' >
                        Wait a second, we will redirect you soon <SentimentVerySatisfiedIcon sx={{ position: "relative", bottom: "-5px" }} />
                    </Typography>
                </Typography>
                <img
                    src={successBg}
                    alt="success bg"
                    loading="lazy"
                    width="600px"
                    height="400px"
                />
            </Stack>
        </Grid>
    )
}

export default Success