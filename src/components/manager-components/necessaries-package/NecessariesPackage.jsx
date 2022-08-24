import "./necessariesPackage.css";
import { Link } from "react-router-dom";

export default function NecessariesPackage({ necessariesPackage }) {
  
  return (
	
	<Link to={`/necessariesPackageInfo?id=${necessariesPackage._id}`} className="link">
		<div className="post">
			{necessariesPackage.image && <img className="postImg" src={necessariesPackage.image} alt="" />}
			<div className="postInfo">
			
				<span className="postTitle">{necessariesPackage.name}</span>	
				<span className="postTitle">{necessariesPackage.totalPrice}</span>
			</div>
		</div>
	</Link>
  );
}
