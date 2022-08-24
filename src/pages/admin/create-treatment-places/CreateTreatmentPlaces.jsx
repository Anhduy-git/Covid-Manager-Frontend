import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import "./createTreatmentPlaces.css";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";

export default function CreateManagers() {

	const nameRef = useRef();	
	const capacityRef = useRef();
	const currentPatientsRef = useRef();	
	const { token } = useContext(Context);
	const history = useHistory();
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	

	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			await axios.post("/treatmentPlaces/create", {
				name: nameRef.current.value,
				capacity: capacityRef.current.value,
				currentPatients: currentPatientsRef.current.value
			}, config);
			//back to list managers page
			history.goBack();
		} catch (err) {
			console.log(err.response.data)			
		}
	};

	return (
	<div className="login">
		<span className="loginTitle">Add New Managers</span>
		<form className="loginForm" onSubmit={handleSubmit}>
		<label>Name</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter name..."
			ref={nameRef}
		/>
		<label>Capacity</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter capacity..."
			ref={capacityRef}
		/>
		<label>Current Patiens</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter current patients..."
			ref={currentPatientsRef}
		/>
		<button className="loginButton" type="submit">
			Add
		</button>
		</form>    
		<AdminSidebar /> 
	</div>
	);
}
