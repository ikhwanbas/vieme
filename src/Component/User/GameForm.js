import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";

export default function GameForm() {
	let initiation = {
		name: "",
		genre: "",
		singlePlayer: true,
		multiplayer: true,
		platform: "",
		release: "",
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
			setInput({
				name,
				genre,
				singlePlayer,
				multiplayer,
				platform,
				release,
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
					`https://super-bootcamp-backend.sanbersy.com/api/games/${currentId}`,
					input,
					{ headers: { Authorization: "Bearer " + user.token } }
				)
				.then(() => {
					history.push("/user/game");
				});
		} else {
			// new
			axios
				.post(`https://super-bootcamp-backend.sanbersy.com/api/games`, input, {
					headers: { Authorization: "Bearer " + user.token },
				})
				.then(() => {
					history.push("/user/game");
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
						Game Form
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="name"
								name="name"
								label="Name"
								fullWidth
								value={input.name}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
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
								id="singlePlayer"
								name="singlePlayer"
								label="SinglePlater"
								fullWidth
								value={input.singlePlayer}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								id="multiplayer"
								name="multiplayer"
								label="Multiplayer"
								fullWidth
								value={input.multiplayer}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="platform"
								name="platform"
								label="Game Platform"
								fullWidth
								value={input.platform}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								onChange={handleChange}
								required
								id="release"
								name="release"
								label="Game Release (yyyy)"
								fullWidth
								value={input.release}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={12}>
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
