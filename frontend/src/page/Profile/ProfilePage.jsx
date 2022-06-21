import { Typography } from '@mui/material';
import React from 'react'
import NavBar from '../../component/Navbar/NavBar';

const ProfilePage = () => {
    const { userName } = JSON.parse(localStorage.getItem('userInformation')) ? JSON.parse(localStorage.getItem('userInformation')) : {};

    return (
        <>
            <NavBar currentPage="Profile" />
            <Typography variant="h4" component="span" id="title" gutterBottom>
                Hi &#128075; {userName}
            </Typography>
        </>
    )

}

export default ProfilePage