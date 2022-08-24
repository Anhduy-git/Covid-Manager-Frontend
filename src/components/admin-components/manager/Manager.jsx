import "./manager.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";

export default function Manager({ manager }) {
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	const onClickBlockBtn = async() => {
		try {
			await axios.get(`/managers/${manager.username}/block`, config);
		} catch(err) {
			console.log(err.response.data);
		}
	}
	return (
		<div className="post">      
			<div className="postInfo">        
				
				<span className="postTitle">{manager.username}</span>								
				<span className="postTitle">******</span>
			</div>	
			<button onClick={onClickBlockBtn}>
				Block
			</button>
			<Link to={`/listManageProcesses/?username=${manager.username}`} className="link">
				<button onClick={onClickBlockBtn}>
					Manage Processes
				</button>
			</Link>	
		</div>

	);
}
