import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";

const theme = createTheme();

const ChangePassword = () => {
	const [user] = useContext(UserContext);
	const [error, setError] = useState();

	const [input, setInput] = useState({
		current_password: "",
		new_password: "",
		new_confirm_password: "",
	});

	let history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(
				"https://super-bootcamp-backend.sanbersy.com/api/change-password",
				input,
				{ headers: { Authorization: "Bearer " + user.token } }
			)
			.then(() => {
				history.push("/user/movie");
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};

	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		setInput({ ...input, [name]: value });
	};

	return (
		<Box sx={{ alignItems: "center", margin: "auto" }}>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 3,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "success" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Change Password
						</Typography>

						{error !== undefined && (
							<Alert severity="error">Please fill the form correctly</Alert>
						)}

						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								onChange={handleChange}
								margin="normal"
								required
								fullWidth
								id="current_password"
								type="password"
								label="Current Password"
								name="current_password"
								value={input.current_password}
								autoFocus
							/>

							<TextField
								onChange={handleChange}
								margin="normal"
								required
								fullWidth
								name="new_password"
								label="New Password"
								type="password"
								id="new_password"
								value={input.new_password}
							/>

							<TextField
								onChange={handleChange}
								margin="normal"
								required
								fullWidth
								name="new_confirm_password"
								label="New Password"
								type="password"
								id="new_confirm_password"
								value={input.new_confirm_password}
							/>

							<Button
								style={{
									backgroundColor: "#2a9d8f",
								}}
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Change Password
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</Box>
	);
};

export default ChangePassword;
