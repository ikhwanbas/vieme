import * as React from "react";

import "../../style/footer.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Copyright = () => {
	return (
		<Typography variant="body2" color="white">
			{"Copyright © "}
			<Link color="inherit" text-decoration="none" href="https://mui.com/">
				Ikhwan Bayu Adhi Setiawan-
			</Link>
			{new Date().getFullYear()}
		</Typography>
	);
};

const StickyFooter = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "10vh",
			}}
		>
			<CssBaseline />

			<Box
				component="footer"
				sx={{
					py: 3,
					px: 2,
					mt: "auto",
					position: "fixed",
					bottom: 0,
					backgroundColor: "#2a9d8f",
				}}
			>
				<Container maxWidth="sm">
					<Typography variant="body1"></Typography>
					<Copyright />
				</Container>
			</Box>
		</Box>
	);
};

export default StickyFooter;
