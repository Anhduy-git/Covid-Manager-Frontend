import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useLocation, useHistory } from "react-router-dom";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import "./createRelatedUsers.css";


export default function CreateRelatedUsers() {

	
	const search = useLocation().search;
	const username = new URLSearchParams(search).get('username');
	const history = useHistory();	
	const identityCardRef = useRef();
	const { token } = useContext(Context);

	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("yes");
		try {
			await axios.post(`/users/${username}/createRelatedUsers`, {
				relatedUser: identityCardRef.current.value
			}, config);			
			//back to list related users page
			window.location.replace(`/listRelatedUsers?username=${username}`);
		} catch (err) {
			console.log(err.response.data)			
		}
	};
	
	

	return (
	<div className="login">
		<span className="loginTitle">Add New Related Users</span>
		<form className="loginForm" onSubmit={handleSubmit}>
		<label>Identity Number: </label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter identity number..."
			ref={identityCardRef}
		/>	
		<button className="loginButton" type="submit">
			Add
		</button>	
		</form>  
	
	</div>
	);
}
