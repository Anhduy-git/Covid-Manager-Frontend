
import "./managerFeatures.css";
import { Link } from "react-router-dom";

import f1 from '../../../assets/f1.png'
import f2 from '../../../assets/f2.png'
import f3 from '../../../assets/f3.png'
import f4 from '../../../assets/f4.png'

export default function ManagerFeatures() {
  return (
    <div className="posts">		
		<Link to={'/listUsers'} className="link">
			<div className="post">
				<img className="postImg" src={f1} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Quản lý người dùng</span>								
				</div>			
			</div>
		</Link>
		<Link to={`/listNecessaries`} className="link">
			<div className="post">
				<img className="postImg" src={f3} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Nhu Yếu phẩm</span>								
				</div>			
			</div>
		</Link>	
		<Link to={`/listNecessariesPackages`} className="link">
			<div className="post">
				<img className="postImg" src={f4} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Gói Nhu Yếu Phẩm</span>								
				</div>			
			</div>
		</Link>	
    </div>
  );
}
