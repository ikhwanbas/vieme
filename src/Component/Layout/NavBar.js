import "../../style/NavBar.css";

import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom";
import logo from "../../image/logo.png";

import { UserContext } from "../../Context/userContext";

const NavBar = () => {
	const [user, setUser] = useContext(UserContext);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	let history = useHistory();

	// code from material UI
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

	return (
		<AppBar style={{ background: "#2a9d8f" }} position="fixed">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
					>
						<img className="image-logo" src={logo} alt="logo-strip" />
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
					>
						Vieme
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{/* Daftar menu */}
							<MenuItem
								key="Home"
								onClick={() => {
									history.push("/");
								}}
							>
								<Typography textAlign="center">Home</Typography>
							</MenuItem>

							<MenuItem
								key="Movie"
								onClick={() => {
									history.push("/movie");
								}}
							>
								<Typography textAlign="center">Movie</Typography>
							</MenuItem>

							<MenuItem
								key="Game"
								onClick={() => {
									history.push("/game");
								}}
							>
								<Typography textAlign="center">Game</Typography>
							</MenuItem>
						</Menu>
					</Box>

					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
					>
						Movie & Game
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Button
							key="Home"
							onClick={() => {
								history.push("/");
							}}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Home
						</Button>
						<Button
							key="Movie"
							onClick={() => {
								history.push("/movie");
							}}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Movie
						</Button>
						<Button
							key="Game"
							onClick={() => {
								history.push("/game");
							}}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Game
						</Button>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{user !== null && (
								<>
									<MenuItem
										key="Dashboard"
										onClick={() => {
											history.push("/user/movie");
										}}
									>
										<Typography textAlign="center">Dashboard</Typography>
									</MenuItem>
									<MenuItem
										key="log_out"
										onClick={() => {
											setUser(null);
											localStorage.clear();
											history.push("/");
										}}
									>
										<Typography textAlign="center">Log Out</Typography>
									</MenuItem>
								</>
							)}
							{user === null && (
								<>
									<MenuItem
										key="Register"
										onClick={() => {
											history.push("/register");
										}}
									>
										<Typography textAlign="center">Register</Typography>
									</MenuItem>
									<MenuItem
										key="Login"
										onClick={() => {
											history.push("/login");
										}}
									>
										<Typography textAlign="center">Login</Typography>
									</MenuItem>
								</>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
