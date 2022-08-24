import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";

export default function User({ user }) {
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	// const onClickBlockBtn = async() => {
	// 	try {
	// 		await axios.get(`/managers/${manager.username}/block`, config);
	// 	} catch(err) {
	// 		console.log(err.response.data);
	// 	}
	// }
	return (
		<Link to={`/userInfo/?username=${user.username}`} className="link">
		<div className="post">      
			<div className="postInfo">        
				
				<span className="postTitle">{user.username}</span>								
				<span className="postTitle">{user.name}</span>
				<span className="postTitle">{user.identityCard}</span>
				<span className="postTitle">{user.state}</span>
			</div>	

		</div>
		</Link>	

	);
}
