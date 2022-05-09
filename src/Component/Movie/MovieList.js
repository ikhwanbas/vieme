import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
import { Button, Rating } from "@mui/material";

const Movie = () => {
	const [movie, setMovie] = useState([]);
	let history = useHistory();
	// mengambil data di API dengan Async-Await
	useEffect(() => {
		const fetchMovie = async () => {
			const result = await axios.get(
				"https://super-bootcamp-backend.sanbersy.com/api/movies"
			);
			setMovie(
				result.data.map((x) => {
					return {
						id: x.id,
						title: x.title,
						description: x.description,
						year: x.year,
						duration: x.duration,
						genre: x.genre,
						rating: x.rating,
						review: x.review,
						image_url: x.image_url,
					};
				})
			);
		};
		fetchMovie();
	}, [setMovie]);

	return (
		<>
			<div className="head-title">
				<h1> All Movies </h1>
			</div>

			<div className="movie-game-card">
				{movie.map((mov) => {
					return (
						<div className="each-card">
							<Card sx={{ width: 280 }}>
								<CardHeader
									avatar={
										<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
											O
										</Avatar>
									}
									title={mov.title}
									subheader={mov.year}
								/>
								<CardMedia
									component="img"
									height="194"
									image={mov.image_url}
									alt="MovieImage"
								/>
								<CardContent>
									<Typography variant="body2" color="text.secondary">
										{mov.description}
									</Typography>
								</CardContent>
								<CardContent>
									<Rating
										name="read-only"
										value={mov.rating ? mov.rating : ""}
										max={10}
										readOnly
									/>
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
										onClick={() => history.push(`movie/detail/${mov.id}`)}
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

export default Movie;
