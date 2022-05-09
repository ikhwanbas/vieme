import React, { useContext } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";

import "../../style/sidebar.css";
import { LiveTv } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const SideBar = () => {
	let history = useHistory();
	const [, setUser] = useContext(UserContext);

	return (
		<div className="sidebar">
			<Box sx={{ width: "250px" }} role="presentation">
				<h1>Dashboard</h1>
				<Divider />
				{/* Sidebar list movie */}
				<List>
					<ListItem
						button
						onClick={() => {
							history.push("/user/movie");
						}}
						key="movie-list"
					>
						<ListItemIcon>
							<LiveTv />
						</ListItemIcon>
						<ListItemText primary="Movie List" />
					</ListItem>
					<ListItem
						button
						onClick={() => {
							history.push("/user/movie/create");
						}}
						key="add-movie"
					>
						<ListItemIcon>
							<LiveTv />
						</ListItemIcon>
						<ListItemText primary="Add New Movie" />
					</ListItem>
				</List>
				<Divider />

				{/* sidebar list game */}
				<List>
					<ListItem
						onClick={() => {
							history.push("/user/game");
						}}
						button
						key="game-list"
					>
						<ListItemIcon>
							<SportsEsportsIcon />
						</ListItemIcon>
						<ListItemText primary="Game List" />
					</ListItem>

					<ListItem
						onClick={() => {
							history.push("/user/game/create");
						}}
						button
						key="add-game"
					>
						<ListItemIcon>
							<SportsEsportsIcon />
						</ListItemIcon>
						<ListItemText primary="Add New Game" />
					</ListItem>
				</List>
				<Divider />

				{/* sidebar for log out and change password */}
				<List>
					<ListItem
						onClick={() => {
							history.push("/user/change_password");
						}}
						button
						key="change-password"
					>
						<ListItemIcon>
							<LockResetIcon />
						</ListItemIcon>
						<ListItemText primary="Change Password" />
					</ListItem>
					<ListItem button key="log-out">
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText
							onClick={() => {
								setUser(null);
								localStorage.clear();
								history.push("/");
							}}
							primary="Log Out"
						/>
					</ListItem>
				</List>
				<Divider />
			</Box>
		</div>
	);
};

export default SideBar;
