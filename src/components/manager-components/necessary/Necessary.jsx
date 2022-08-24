import "./necessary.css";
import { Link } from "react-router-dom";

export default function Necessary({ necessary }) {
  
  return (
	
	<Link to={`/necessaryInfo?id=${necessary._id}`} className="link">
		<div className="post">
			{necessary.image && <img className="postImg" src={necessary.image} alt="" />}
			<div className="postInfo">			
				<span className="postTitle">{necessary.name}</span>		
				<span className="postTitle">{necessary.price}</span>			
			</div>
		</div>
	</Link>
  );
}
