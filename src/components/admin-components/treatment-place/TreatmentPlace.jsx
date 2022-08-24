import "./treatmentPlace.css";
import { Link } from "react-router-dom";

export default function TreatmentPlace({ treatmentPlace }) {
  
  return (
	// <Link to={`/post/${post._id}`} className="link">
		<div className="post">      
			<div className="postInfo">        
				
				<span className="postTitle">{treatmentPlace.name}</span>								
				<span className="postTitle">{treatmentPlace.capacity}</span>
				<span className="postTitle">{treatmentPlace.currentPatients}</span>
			</div>			
		</div>
	// </Link>
  );
}
