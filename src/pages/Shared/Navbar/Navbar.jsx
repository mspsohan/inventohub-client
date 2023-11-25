import * as React from 'react';
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
import { Link, NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Login, Person2 } from '@mui/icons-material';
import useAuth from '../../../hooks/useAuth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Logo from '../../../components/Logo/Logo';
import useRole from '../../../hooks/useRole';

const userIcon = 'https://i.ibb.co/6HtdFTk/585e4bf3cb11b227491c339a.png'
const shopLogo = 'https://i.ibb.co/PFhTpK2/Invebto-Hub-2.png'

const Navbar = () => {
   const { user, logOut } = useAuth()
   const { role } = useRole()
   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const navlinks = <>
      <NavLink to="/" className={({ isActive }) => isActive ? "button" : "normal-button"}>
         Home
      </NavLink>
      {
         !user && <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "button" : "normal-button"}>Login</NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "button" : "normal-button"}>Register</NavLink>
         </>
      }

      {
         (!role || role === 'user' || !user) && <button disabled={!user}><NavLink disabled={!user?.email} to="/create-store" className={({ isActive }) => isActive ? "button" : "normal-button"}>Create-Store</NavLink></button>
      }

      {
         (role === "manager" || role === "admin") && <NavLink to="/dashboard" className={({ isActive }) => isActive ? "button" : "normal-button"}>Dashboard</NavLink>
      }
      <NavLink to="/watch-demo" className={({ isActive }) => isActive ? "button" : "normal-button"}>Watch Demo</NavLink>
   </>

   return (
      <AppBar sx={{ backgroundColor: '#387ae8' }} position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <NavLink to="/">
                     <img src="https://i.ibb.co/PFhTpK2/Invebto-Hub-2.png" className='' alt="Your Logo" style={{ height: '35px', marginRight: '8px', backgroundColor: 'white', borderRadius: '5px' }} />
                  </NavLink>
               </Box>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                     <ul className='flex flex-col gap-2 px-[14px] text-lg'>
                        {navlinks}
                     </ul>
                  </Menu>
               </Box>
               <Logo logo={shopLogo}></Logo>
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <ul className='flex gap-8'>
                     {navlinks}
                  </ul>
               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open Profile">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="User Pic" src={user?.photoURL ? user?.photoURL : userIcon} />
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
                     {
                        user && user?.email ? <MenuItem sx={{ display: 'block' }} onClick={handleCloseUserMenu}>
                           <Typography sx={{ paddingLeft: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} textAlign="center"><Person2 /> <span className='pl-3'>{user?.displayName}</span></Typography>
                           <Button
                              onClick={logOut}
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'start',
                                 alignItems: 'center',
                                 color: 'red',
                                 fontWeight: '600',
                                 width: '100%',
                                 '&:hover': {
                                    backgroundColor: '#001B79',
                                 },
                                 marginTop: '5px'
                              }}
                           >
                              <LogoutIcon />
                              <span className='pl-2'>LogOut</span>
                           </Button>
                        </MenuItem> : <MenuItem sx={{ display: 'grid' }} onClick={handleCloseUserMenu}>
                           <Link to="/login" className='hover:bg-[#001B79] rounded-md'><Button sx={{ ":hover": { color: 'white' } }}><Login sx={{ mr: 1 }}></Login>Login</Button></Link>
                           <Link to="/signup" className='hover:bg-[#001B79] rounded-md'><Button sx={{ ":hover": { color: 'white' } }}><PersonAddIcon sx={{ mr: 1 }} />Register</Button></Link>
                        </MenuItem>
                     }
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar >
   );
}
export default Navbar;