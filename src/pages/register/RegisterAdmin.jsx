import axios from "axios";
import { useState } from "react";
import "./register.css";

export default function RegisterAdmin() {  
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);	
	

	const handleSubmit = async (e) => {
	e.preventDefault(); //not refresh page
	setError(false);
	try {
		await axios.post(`/managers/createAdmin`, {
			username,
			password,
			isAdmin: true
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

		<label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
		
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
		
		{error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
	</div>
	);
}
