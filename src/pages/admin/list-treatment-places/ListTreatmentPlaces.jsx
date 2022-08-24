import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import TreatmentPlaces from "../../../components/admin-components/treatment-places/TreatmentPlaces";
import "./listTreatmentPlaces.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";

export default function ListTreatmentPlaces() {		
	const [treatmentPlaces, setTreatmentPlaces] = useState([]);	

	useEffect(() => {
		const fetchTreatmentPlaces = async () => {
			try {
				const res = await axios.get("/treatmentPlaces/getAll");
				if (res.data) {
					setTreatmentPlaces(res.data);
				}
				
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchTreatmentPlaces();
	},[treatmentPlaces]); //if search update, then run again

	return (
	<>
		<Header />
		<div className="home">
		<TreatmentPlaces treatmentPlaces={treatmentPlaces}/>	

		<Link to={"/createTreatmentPlaces"} className="link">
			<button>
				Add
			</button>	
		</Link>

		<AdminSidebar />
		</div>
	</>
	);
}
