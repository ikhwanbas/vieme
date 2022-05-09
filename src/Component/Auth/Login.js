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

export default function Login() {
	const [, setUser] = useContext(UserContext);
	const [input, setInput] = useState({ email: "", password: "" });
	const [error, setError] = useState();
	let history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post("https://super-bootcamp-backend.sanbersy.com/api/login", {
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
						Sign in
					</Typography>

					{error !== undefined && (
						<Alert severity="error">The email or password is incorrect</Alert>
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
							autoComplete="current-password"
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
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
