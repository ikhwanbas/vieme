import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";

export default function MovieForm() {
	let initiation = {
		title: "",
		description: "",
		year: "",
		duration: "",
		genre: "",
		rating: "",
		review: "",
		image_url: "",
	};

	let history = useHistory();
	const [user] = useContext(UserContext);
	const [input, setInput] = useState(initiation);
	const [currentId, setCurrentId] = useState(null);
	let { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
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
			setInput({
				title,
				description,
				year: parseInt(year),
				duration: parseInt(duration),
				genre,
				rating: parseInt(rating),
				review,
				image_url,
			});
			setCurrentId(result.data.id);
		};

		if (id !== undefined) {
			fetchData();
		}
	}, [id]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (currentId !== null) {
			// edit
			axios
				.put(
					`https://super-bootcamp-backend.sanbersy.com/api/movies/${currentId}`,
					input,
					{ headers: { Authorization: "Bearer " + user.token } }
				)
				.then(() => {
					history.push("/user/movie");
				});
		} else {
			// new
			axios
				.post(`https://super-bootcamp-backend.sanbersy.com/api/movies`, input, {
					headers: { Authorization: "Bearer " + user.token },
				})
				.then(() => {
					history.push("/user/movie");
				});
		}
		setInput(initiation);
	};

	const handleChange = (event) => {
		let val = event.target.value;
		let name = event.target.name;
		setInput({ ...input, [name]: val });
	};

	return (
		<>
			<React.Fragment>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ width: "60%", marginTop: "25px", marginLeft: "2%" }}
				>
					<Typography variant="h4" gutterBottom>
						Movie Form
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="title"
								name="title"
								label="Title"
								fullWidth
								value={input.title}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="year"
								name="year"
								label="Release Year (yyyy)"
								fullWidth
								value={input.year}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleChange}
								required
								id="description"
								name="description"
								label="Description"
								fullWidth
								value={input.description}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={handleChange}
								id="review"
								name="review"
								label="Movie Review"
								fullWidth
								value={input.review}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="duration"
								name="duration"
								label="Duration (in minutes)"
								fullWidth
								value={input.duration}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								id="genre"
								name="genre"
								label="Genre"
								fullWidth
								value={input.genre}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="rating"
								name="rating"
								label="Movie Rating"
								fullWidth
								value={input.rating}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="image_url"
								name="image_url"
								label="Image URL"
								fullWidth
								value={input.image_url}
								variant="standard"
							/>
						</Grid>
					</Grid>

					<Button
						style={{
							backgroundColor: "#2a9d8f",
						}}
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Submit
					</Button>
				</Box>
			</React.Fragment>
		</>
	);
}
