import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import "./login.css";

export default function Login() {
	
	const userRef = useRef();	
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const history = useHistory();

	const handleSubmit = async (e) => {
	e.preventDefault();
	dispatch({ type: "LOGIN_START" });
	try {
		const res = await axios.post("/users/login", {
			username: userRef.current.value,
			password: passwordRef.current.value,
		});
		const data = res.data;	
		if (data.userManager) {
			if (data.hasPassword) {
				if (data.userManager.isAdmin) {
					dispatch({ type: "LOGIN_SUCCESS_ADMIN", payload: data.userManager, token: data.token });
				} else {
					dispatch({ type: "LOGIN_SUCCESS_MANAGER", payload: data.userManager, token: data.token });
				}
			} else {
				console.log('No password provided')
				history.push(`/registerPassword?username=${data.userManager.username}`);
			}
			
		}
		else if (data.user) {
			if (data.hasPassword) {
				console.log('user')
				dispatch({ type: "LOGIN_SUCCESS_USER", payload: data.user, token: data.token });
			} else {
				console.log('No password provided')
				history.push(`/registerPassword?username=${data.user.username}`);
			}
		}		
		
	} catch (err) {
		console.log(err.response.data);
		dispatch({ type: "LOGIN_FAILURE" });
	}
	};

	return (
	<div className="login">
		<span className="loginTitle">Login</span>
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
			Login
		</button>
		</form>     
	</div>
	);
}
