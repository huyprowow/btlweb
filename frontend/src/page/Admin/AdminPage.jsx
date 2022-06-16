import { useState } from 'react';
import { Avatar, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AdminAvatar from '../../assets/AdminAvatar.jpg';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import "./style.scss"
import Overview from '../../component/Overview/Overview';
import AddProduct from '../../component/AddProduct/AddProduct';
import Invoice from '../../component/Invoice/Invoice';
const AdminPage = () => {
    const [content, setContent] = useState("addProduct");
    const navigate = useNavigate()
    const goToDashBoard = () => {
        navigate("/dashboard");
    }

    const handleChangeFeature = (feature) => {
        setContent(feature);
    }
    return (
        <Grid container spacing={3} height={{
            xs: "60vh",
            sm: "60vh",
            md: "100vh"
        }}>
            <Grid item xs={12} sm={12} md={2}>
                <Box sx={{ display: "flex", alignContent: "center", margin: "10px" }}>
                    {/* <img src="/images/AdminAvatar.jpg" alt="" width={100} height={100} /> */}
                    <Avatar alt="admin" src={AdminAvatar} />
                    <Typography variant="h5" component="h5" sx={{ alignSelf: "flex-end" }}>
                        Admin
                    </Typography>
                </Box>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{
                    }}
                        selected={content === "overview"}
                        onClick={() => handleChangeFeature("overview")}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <DonutSmallRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Overview" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding
                        selected={content === "addProduct"}
                        onClick={() => handleChangeFeature("addProduct")}

                    >
                        <ListItemButton>
                            <ListItemIcon >
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Product" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding
                        selected={content === "invoice"}
                        onClick={() => handleChangeFeature("invoice")}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Invoice" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                {content === "overview" && <Overview />}
                {content === "addProduct" && <AddProduct />}
                {content === "invoice" && <Invoice />}
            </Grid>
        </Grid>

    )

}

export default AdminPage