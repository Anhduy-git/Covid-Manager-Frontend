import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import Managers from "../../../components/admin-components/managers/Managers";
import "./listManagers.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";

export default function ListManagers() {		
	const [managers, setManagers] = useState([]);	
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	useEffect(() => {
		const fetchManagers = async () => {
			try {
				const res = await axios.get("/managers/getAll", config);				
				if (res.data) {
					setManagers(res.data);
				}
				
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchManagers();
	},[managers]); //if search update, then run again

	return (
	<>
		<Header />
		<div className="home">
		<Managers managers={managers}/>	

		<Link to={"/createManagers"} className="link">
			<button>
				Add
			</button>	
		</Link>

		<AdminSidebar />
		</div>
	</>
	);
}
