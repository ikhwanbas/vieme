import "../../style/detail.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const MovieDetail = () => {
	const [movie, setMovie] = useState({});
	let { id } = useParams();

	// mengambil data di API dengan Async-Await
	useEffect(() => {
		const fetchMovie = async () => {
			const result = await axios.get(
				`https://super-bootcamp-backend.sanbersy.com/api/movies/${id}`
			);
			let {
				title,
				description,
				year,
				duration,
				genre,
				rating,
				review,
				image_url,
			} = result.data;
			setMovie({
				title,
				description,
				year,
				duration,
				genre,
				rating,
				review,
				image_url,
			});
		};
		fetchMovie();
	}, [id]);

	return (
		<div className="container">
			<div className="content-detail">
				<Card sx={{ maxWidth: 1000 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="400"
							image={movie.image_url}
							alt={movie.title}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{movie.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Description : {movie.description}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Year Release : {movie.year}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Movie Duration : {movie.duration} minutes
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Genre : {movie.genre}
							</Typography>

							<Rating
								name="read-only"
								value={movie.rating ? movie.rating : ""}
								max={10}
								readOnly
							/>
							<Typography variant="body2" color="text.secondary">
								Movie Review : {movie.review}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		</div>
	);
};

export default MovieDetail;
