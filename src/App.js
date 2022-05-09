import "./App.css";
import SideBar from "./Component/Layout/SideBar";
import NavBar from "./Component/Layout/NavBar";
import StickyFooter from "./Component/Layout/Footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./Context/userContext";
import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import Game from "./Component/Game/GameList";
import Movie from "./Component/Movie/MovieList";
import MovieTable from "./Component/User/MovieTable";
import MovieForm from "./Component/User/MovieForm";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import GameTable from "./Component/User/GameTable";
import GameForm from "./Component/User/GameForm";
import ChangePassword from "./Component/User/ChangePassword";
import MovieDetail from "./Component/Movie/MovieDetail";
import GameDetail from "./Component/Game/GameDetail";

function App() {
	// menggunakan konteks user
	const [user] = useContext(UserContext);

	// membuat fungsi untuk membuat route menjadi private
	const PrivateRoute = ({ ...rest }) => {
		if (user) {
			return <Route {...rest} />;
		} else {
			return <Redirect to="/login" />;
		}
	};

	return (
		<Router>
			<div className="App" style={{ backgroundColor: "#eff7f6" }}>
				<NavBar />
				<div className="content">
					<Switch>
						{/* route homepage */}
						<Route exact path="/">
							<Movie />
							<Game />
						</Route>

						{/* route all movies */}
						<Route exact path="/movie">
							<Movie />
						</Route>

						{/* route all games */}
						<Route exact path="/game">
							{/* <SideBar /> */}
							<Game />
						</Route>

						{/* route form register */}
						<Route exact path="/register">
							{/* <SideBar /> */}
							<Register />
						</Route>

						{/* route form login */}
						<Route exact path="/login">
							<Login />
						</Route>

						{/* route to change password */}
						<PrivateRoute exact path="/user/change_password">
							<div className="section-div">
								<SideBar />
								<ChangePassword />
							</div>
						</PrivateRoute>

						{/* private Route tabel movie  */}
						<PrivateRoute exact path="/user/movie">
							<div className="section-div">
								<SideBar />
								<MovieTable />
							</div>
						</PrivateRoute>

						{/* Route detail movie  */}
						<Route exact path="/movie/detail/:id">
							{/* <SideBar /> */}
							<MovieDetail />
						</Route>

						{/* private route form movie */}
						<PrivateRoute exact path="/user/movie/create">
							<div className="section-div">
								<SideBar />
								<MovieForm />
							</div>
						</PrivateRoute>

						{/* private route to edit movie */}
						<PrivateRoute exact path="/user/movie/edit/:id">
							<div className="section-div">
								<SideBar />
								<MovieForm />
							</div>
						</PrivateRoute>

						{/* private route tabel game */}
						<PrivateRoute exact path="/user/game">
							<div className="section-div">
								<SideBar />
								<GameTable />
							</div>
						</PrivateRoute>

						{/* Route detail game  */}
						<Route exact path="/game/detail/:id">
							<GameDetail />
						</Route>

						{/* private route form game */}
						<PrivateRoute exact path="/user/game/create">
							<div className="section-div">
								<SideBar />
								<GameForm />
							</div>
						</PrivateRoute>

						{/* private route to edit game */}
						<PrivateRoute exact path="/user/game/edit/:id">
							<div className="section-div">
								<SideBar />
								<GameForm />
							</div>
						</PrivateRoute>
					</Switch>
				</div>
				<StickyFooter />
			</div>
		</Router>
	);
}

export default App;
