import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const GameDetail = () => {
	const [game, setGame] = useState([]);
	let { id } = useParams();

	// mengambil data di API dengan Async-Await
	useEffect(() => {
		const fetchGame = async () => {
			const result = await axios.get(
				`https://super-bootcamp-backend.sanbersy.com/api/games/${id}`
			);
			let {
				name,
				genre,
				singlePlayer,
				multiplayer,
				platform,
				release,
				image_url,
			} = result.data;
			setGame({
				name,
				genre,
				singlePlayer,
				multiplayer,
				platform,
				release,
				image_url,
			});
		};
		fetchGame();
	}, [id, setGame]);

	return (
		<div className="container">
			<div className="content-detail">
				<Card sx={{ maxWidth: 1000 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="400"
							image={game.image_url}
							alt={game.name}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{game.name}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Genre : {game.genre}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Platform : {game.platform}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Game Release : {game.release}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Single Player : {game.singlePlayer}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Multi Player : {game.multiplayer}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</div>
	);
};

export default GameDetail;
