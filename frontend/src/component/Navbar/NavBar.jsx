import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdminAvatar from '../../assets/AdminAvatar.jpg';
import HideOnScroll from './HideOnScroll';
import Logo from '../../assets/Logo.png';
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const NavBar = (props) => {
    const { currentPage } = props;
    const { role } = JSON.parse(localStorage.getItem('userInformation')) ? JSON.parse(localStorage.getItem('userInformation')) : {};
    const pages = role ? ["Chat"] : [];
    const settings = (role === "admin") ? ['Profile', 'AdminPage', 'Logout'] : ['Profile', 'Logout'];
    var index = settings.indexOf(currentPage);
    if (index !== -1) {
        settings.splice(index, 1);
    }
    // console.log(role);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token1");
        localStorage.removeItem("userInformation");
        navigate("/login");
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        console.log(e.target.textContent);
        switch (e.target.textContent) {
            case "Chat":
                navigate("/chat");
                break;
            default:
                break;
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e) => {
        switch (e.target.textContent) {
            case "Profile":
                navigate("/profile");
                break;
            case "AdminPage":
                navigate("/admin");
                break;
            case "Logout":
                handleLogout();
                break;
            default:
                break;
        }
        setAnchorElUser(null);
    };

    return (
        <HideOnScroll {...props}>
            <AppBar position="static" sx={{ backgroundColor: "#faf0e6", color: "black" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters >
                        <Box
                            component="img"
                            sx={{
                                height: 66,
                                width: 120,
                                maxHeight: 66,
                                maxWidth: 120,
                                display: { xs: 'none', md: 'inline' },
                                cursor: 'pointer',
                            }}
                            alt="Logo"
                            src={Logo}
                            onClick={() => navigate("/")}
                        />
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}

                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" name={page}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Grid sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
                            <Box
                                component="img"
                                sx={{
                                    height: 66,
                                    width: 120,
                                    maxHeight: 66,
                                    maxWidth: 120,
                                    display: { xs: 'inline', md: 'none' },
                                    cursor: "pointer"
                                }}
                                alt="Logo"
                                src={Logo}
                                onClick={() => navigate("/")}
                            />
                        </Grid>

                        <Box sx={{ flexGrow: 1, height: "64px", display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: "black", display: 'block', margin: 0 }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {role ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="avatar" src={role === "admin" ? AdminAvatar : ""} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" name={setting}>{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" style={{ textDecoration: "none", marginRight: 2 }}>
                                        <Button variant='outlined' size="small" sx={{
                                            backgroundColor: "white",
                                            borderColor: "black",
                                            color: "black", '&:hover': {
                                                borderColor: "white",
                                                backgroundColor: 'rgba(46, 125, 50, 0.5)',
                                                color: 'white',
                                            }
                                        }} >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" style={{ textDecoration: "none" }}>
                                        <Button variant='outlined' size="small" sx={{
                                            borderColor: "#000",
                                            backgroundColor: "black",
                                            color: "white",
                                            '&:hover': {
                                                borderColor: "white",
                                                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                                color: 'white',
                                            }
                                        }}>
                                            SignUp
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

        </HideOnScroll>
    );
};
export default NavBar;