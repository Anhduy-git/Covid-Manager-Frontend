import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./register.css";

export default function RegisterPassword() {  
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);	
	const search = useLocation().search;
  	const username = new URLSearchParams(search).get('username');
	

	const handleSubmit = async (e) => {
	e.preventDefault(); //not refresh page
	setError(false);
	try {
		await axios.patch(`/users/${username}/updatePassword`, {
			password,
		});
		window.location.replace("/login");
	} catch (err) {
		console.log(err);
		setError(true);
	}
	};
	return (
	<div className="register">
		<span className="registerTitle">Register</span>
		<form className="registerForm" onSubmit={handleSubmit}>
		
		<label>Password</label>
		<input
			type="password"
			className="registerInput"
			placeholder="Enter your password..."
			onChange={(e) => setPassword(e.target.value)}
		/>
		<button className="registerButton" type="submit">
			Register
		</button>
		</form>
		<button className="registerLoginButton">
		<Link className="link" to="/login">
			Login
		</Link>
		</button>
		{error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
	</div>
	);
}
