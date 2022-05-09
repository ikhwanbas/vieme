import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import "../../style/card.css";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Game = () => {
	const [game, setGame] = useState([]);

	let history = useHistory();
	// mengambil data di API dengan Async-Await
	useEffect(() => {
		const fetchGame = async () => {
			const result = await axios.get(
				"https://super-bootcamp-backend.sanbersy.com/api/games"
			);
			setGame(
				result.data.map((x) => {
					return {
						id: x.id,
						name: x.name,
						genre: x.genre,
						singlePlayer: x.singlePlayer,
						multiplayer: x.multiplayer,
						platform: x.platform,
						release: x.release,
						image_url: x.image_url,
					};
				})
			);
		};
		fetchGame();
	}, []);

	return (
		<>
			<div className="head-title">
				<h1> All Games </h1>
			</div>

			<div className="movie-game-card">
				{game.map((gem) => {
					return (
						<div className="each-card">
							<Card sx={{ width: 280 }}>
								<CardHeader
									avatar={
										<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
											O
										</Avatar>
									}
									title={gem.name}
									subheader={gem.release}
								/>
								<CardMedia
									component="img"
									height="194"
									image={gem.image_url}
									alt="GameImage"
								/>
								<CardContent>
									<Typography variant="body2" color="text.secondary">
										{gem.genre}
									</Typography>
								</CardContent>
								<CardContent>
									<Typography variant="body2" color="text.secondary">
										{gem.platform}
									</Typography>
								</CardContent>
								<CardContent>
									<Typography variant="body2" color="text.secondary">
										{gem.singlePlayer}
									</Typography>
								</CardContent>
								<CardContent>
									<Typography variant="body2" color="text.secondary">
										{gem.multiplayer}
									</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
									</IconButton>
									<IconButton aria-label="share">
										<ShareIcon />
									</IconButton>
									<Button
										variant="text"
										onClick={() => history.push(`game/detail/${gem.id}`)}
									>
										Read More
									</Button>
								</CardActions>
							</Card>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Game;
