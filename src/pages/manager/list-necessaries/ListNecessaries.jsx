import { useEffect, useState, useContext } from "react";
import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import Necessaries from "../../../components/manager-components/necessaries/Necessaries";
import "./listNecessaries.css";
import axios from "axios";
import { Context } from "../../../context/Context";
import { Link, useLocation, useHistory } from "react-router-dom";


export default function ListNecessaries() {	

	const [necessaries, setNecessaries] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortTerm, setSortTerm] = useState("?sortBy=price:name");
	const [nameSortType, setNameSortType] = useState(1);
	const [priceSortType, setPriceSortType] = useState(1);
	const {token} = useContext(Context);	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	
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
	const onPriceSortClick = () => {		
		if (priceSortType === 1) {
			setPriceSortType(-1);	
			const index = sortTerm.indexOf("price");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setPriceSortType(1);		
			const index = sortTerm.indexOf("price");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	
	useEffect(() => {
		const fetchNecessaries = async () => {
			try {
				console.log(sortTerm);
				const res = await axios.get(`/necessaries/getAll/${sortTerm}`, config);
				if (res.data) {
					setNecessaries(res.data);
				}												
			} catch (err) {				
				console.log(err);
			}
		};
		
		fetchNecessaries();
	}); //if search update, then run again

	return (
	<>
		<Header />
		
		<div className="home">
			<div>
				<input type="text" 
					placeholder="Search by name"
					onChange={(event) => {
						setSearchTerm(event.target.value);					
				}} />
			</div>

			<button className="loginButton" onClick={onNameSortClick}>
				Sort By Name
			</button>	
			<button className="loginButton" onClick={onPriceSortClick}>
				Sort By Price
			</button>	
			<Necessaries necessaries={necessaries} searchTerm={searchTerm}/>	

			<Link to={"/createNecessaries"} className="link">
				<button>
					Add
				</button>	
			</Link>
		
		</div>
	</>
	);
}
