import { useEffect, useState, useContext } from "react";
import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import Users from "../../../components/manager-components/users/Users";
import "./listRelatedUsers.css";
import axios from "axios";
import { Context } from "../../../context/Context";
import { Link, useLocation, useHistory } from "react-router-dom";

export default function ListRelatedUsers() {	

	const [relatedUsers, setRelatedUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortTerm, setSortTerm] = useState("?sortBy=state:name");
	const [nameSortType, setNameSortType] = useState(1);
	const [stateSortType, setStateSortType] = useState(1);	
	const {token} = useContext(Context);
	const search = useLocation().search;
	const username = new URLSearchParams(search).get('username');
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const history = useHistory();

	const onNameSortClick = () => {		
		if (nameSortType === 1) {
			setNameSortType(-1);		
			const index = sortTerm.indexOf("name");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setNameSortType(1);		
			const index = sortTerm.indexOf("name");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	const onStateSortClick = () => {		
		if (stateSortType === 1) {
			setStateSortType(-1);			
			const index = sortTerm.indexOf("state");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setStateSortType(1);			
			const index = sortTerm.indexOf("state");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	
	useEffect(() => {
		const fetchRelatedUsers = async () => {
			try {			
				const res = await axios.get(`/users/${username}/getRelatedUsers/${sortTerm}`, config);
				if (res.data) {
					console.log(res.data);
					setRelatedUsers(res.data);
				}												
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchRelatedUsers();
	}, [relatedUsers, sortTerm]); //if search update, then run again

	return (
	<>
		<Header />
		<div className="home">
		<input type="text" 
			placeholder="Search by id number"
			onChange={(event) => {
				setSearchTerm(event.target.value);					
		}} />
		<button className="loginButton" onClick={onNameSortClick}>
			Sort By Name
		</button>	
		<button className="loginButton" onClick={onStateSortClick}>
			Sort By state
		</button>	
		<Users users={relatedUsers} searchTerm={searchTerm}/>	

		<Link to={`/createRelatedUsers?username=${username}`} className="link">
			<button>
				Add
			</button>	
		</Link>

		<button className="loginButton" onClick={() => window.location.replace('/listUsers')} >
			Done
		</button>	

		
		</div>
	</>
	);
}
