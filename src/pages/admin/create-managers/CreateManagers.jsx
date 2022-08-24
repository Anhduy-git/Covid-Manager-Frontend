import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import "./createManagers.css";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";


export default function CreateManagers() {

	const userRef = useRef();	
	const passwordRef = useRef();
	const { token, isFetching } = useContext(Context);
	const history = useHistory();
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	

	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			await axios.post("/managers/create", {
				username: userRef.current.value,
				password: passwordRef.current.value,
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
		<label>Username</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter your username..."
			ref={userRef}
		/>
		<label>Password</label>
		<input
			type="password"
			className="loginInput"
			placeholder="Enter your password..."
			ref={passwordRef}
		/>
		<button className="loginButton" type="submit" disabled={isFetching}>
			Add
		</button>
		</form>     
		<AdminSidebar />
	</div>
	);
}
