import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ********** MAIN LAYOUT
function App() {
	const user = "admin";
	if (user === "admin") {
		return (
			<>
				<Header />
				<Outlet />
				<Footer />
			</>
		);
	}
	return <p>Not allowed</p>;
}

export default App;
