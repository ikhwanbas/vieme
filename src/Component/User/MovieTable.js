import "../../style/movieGameTable.css";
import React from "react";
import { useState, useEffect, useContext } from "react";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { UserContext } from "../../Context/userContext";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const MovieTable = () => {
	// menggunakan konteks user
	const [user] = useContext(UserContext);

	// state untuk menyimpan data movie
	const [input, setInput] = useState([]);
	// fetch trigger
	const [fetchTrigger, setFetchTrigger] = useState(true);

	// beralih ke halaman lain
	let history = useHistory();
	// trigger untuk dropdown table
	const [open, setOpen] = useState(false);
	// mengambil data movie di API dengan Async-Await
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				`https://super-bootcamp-backend.sanbersy.com/api/movies`
			);

			setInput(
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
		if (fetchTrigger) {
			fetchData();
			setFetchTrigger(false);
		}
	}, [fetchTrigger]);

	const ActionButton = ({ name, id }) => {
		const handleAction = async () => {
			let caseName = name.toLowerCase();
			if (caseName === "delete") {
				await axios
					.delete(
						`https://super-bootcamp-backend.sanbersy.com/api/movies/${id}`,
						{ headers: { Authorization: "Bearer " + user.token } }
					)
					.then(() => {
						setFetchTrigger(true);
					});
			} else if (caseName === "edit") {
				history.push(`/user/movie/edit/${id}`);
			}
		};

		return (
			<Button variant="contained" color="success" onClick={handleAction}>
				{name}
			</Button>
		);
	};

	const column = [
		{
			width: "50",
			field: "collapse",
			headerName: "",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}
						>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</>
				);
			},
		},
		{ field: "title", headerName: "Title", width: 350 },

		{ field: "year", headerName: "Release", width: 100 },
		{ field: "duration", headerName: "Duration", width: 100 },
		{ field: "genre", headerName: "Genre", width: 230 },
		{ field: "rating", headerName: "Rating", width: 100 },
		{ field: "review", headerName: "Review", width: 230 },
		{
			width: "230",
			field: "action",
			headerName: "Action",
			sortable: false,
			renderCell: (params) => {
				return (
					<>
						<ActionButton name="edit" id={params.id} />
						<ActionButton name="delete" id={params.id} />
					</>
				);
			},
		},
	];

	return (
		<div className="data-tabel">
			<h2>Movie List</h2>
			<div style={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={input}
					columns={column}
					initialState={{
						pagination: {
							pageSize: 5,
						},
					}}
				/>
			</div>
		</div>
	);
};

export default MovieTable;
