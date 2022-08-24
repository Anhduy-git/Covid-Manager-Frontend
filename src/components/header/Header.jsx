import "./header.css";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Header() {

	const { user, dispatch } = useContext(Context);  	
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace('/');
	};
	return (
	<div className="header">
		<div className="headerTitles">
		<span className="headerTitleSm">React & Node</span>
		<span className="headerTitleLg">Blog</span>
		</div>
		<button className="topListItem" onClick={handleLogout}>
			{user && "LOGOUT"}
		</button>
		<img
		className="headerImg"
		src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
		alt=""
		/>
	</div>
	);
}
