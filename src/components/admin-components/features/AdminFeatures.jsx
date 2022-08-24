
import "./adminFeatures.css";
import { Link } from "react-router-dom";
import f1 from '../../../assets/f1.png'
import f2 from '../../../assets/f2.png'
import f3 from '../../../assets/f3.png'
import f4 from '../../../assets/f4.png'

export default function AdminFeatures() {
  return (
    <div className="posts">		
		<Link to={'/listManagers'} className="link">
			<div className="post">
				<img className="postImg" src={f2} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Quản lý tài khoản</span>								
				</div>			
			</div>
		</Link>
		<Link to={`/listTreatmentPlaces`} className="link">
			<div className="post">
				<img className="postImg" src={f3} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Địa điểm điều trị/cách ly</span>								
				</div>			
			</div>
		</Link>	
		<Link to={`/`} className="link">
			<div className="post">
				<img className="postImg" src={f4} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Cài đặt</span>								
				</div>			
			</div>
		</Link>	
		
    </div>
  );
  
}
