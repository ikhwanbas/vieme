import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

const Register = () => {
	const [, setUser] = useContext(UserContext);
	const [input, setInput] = useState({ name: "", email: "", password: "" });
	const [error, setError] = useState();

	let history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post("https://super-bootcamp-backend.sanbersy.com/api/register", {
				name: input.name,
				email: input.email,
				password: input.password,
			})
			.then((res) => {
				var user = res.data.user;
				var token = res.data.token;
				var currentUser = { name: user.name, email: user.email, token };
				setUser(currentUser);
				localStorage.setItem("user", JSON.stringify(currentUser));
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
		<>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "success" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign Up
						</Typography>

						{error !== undefined && (
							<Alert severity="error">Please fill this form correctly</Alert>
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
								id="username"
								label="Username"
								name="name"
								autoComplete="username"
								autoFocus
							/>
							<TextField
								onChange={handleChange}
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<TextField
								onChange={handleChange}
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="password"
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
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
								Sign Up
							</Button>
							<Grid container>
								<Grid item>
									<Link href="/login" variant="body2">
										{"Already have an account? Sign In"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	);
};

export default Register;
