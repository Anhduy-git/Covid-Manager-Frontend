import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory, useLocation, Link } from "react-router-dom";
import "./userInfo.css";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";

export default function UserInfo() {
	
	const { token, isFetching } = useContext(Context);
	const history = useHistory();

	const [username, setUsername] = useState('');	
	const [name, setName] = useState('');	
	const [id, setID] = useState('');	
	const [email, setEmail] = useState('');	
	const [dateOfBirth, setDateOfBirth] = useState('');	
	const [debt, setDebt] = useState('');	
	const [treatmentPlaces, setTreatmentPlaces] = useState([]);
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [selectedWard, setSelectedWard] = useState('');
	const [selectedState, setSelectedState] = useState('F0');
	const [selectedTreatmentPlace, setSelectedTreatmentPlace] = useState('');
	const [updating, setUpdating] = useState(false);
	const search = useLocation().search;
	const usernameQuery = new URLSearchParams(search).get('username');
	const [modalNotifyOpen, setModalNotifyOpen] = useState(false);
	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	const onUpdateBtnClick = () => {
		setUpdating(!updating);
	}
	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			const res = await axios.patch(`/users/${usernameQuery}/update`, {				
				state: selectedState,
				placeOfTreatment: selectedTreatmentPlace

			}, config);
			if (res.data && res.data.treatmentPlaceIsFull) {
				console.log("yes")
				setModalNotifyOpen(true);
				return;
			}
			//back to list managers page
			history.goBack();
		} catch (err) {
			console.log(err)			
		}
	};
	


	useEffect(() => {
		
		const fetchDataOfUser = async() => {
			try {
				const res = await axios.get(`/users/${usernameQuery}/get`, config);	
				//init data of current user
				if (res.data) {					
					setUsername(res.data.username);
					setName(res.data.name);
					setID(res.data.identityCard);
					setEmail(res.data.email);
					setDebt(res.data.debt.toString());					
					setDateOfBirth(res.data.dateOfBirth);
					setSelectedCity(res.data.address.city);
					setSelectedDistrict(res.data.address.district);
					setSelectedWard(res.data.address.ward);
					setSelectedState(res.data.state);
					setSelectedTreatmentPlace(res.data.placeOfTreatment);
				}

			} catch(err) {
				console.log(err);
			}
		}
				
		const fetchPlaceOfTreatments = async() => {
			const res = await axios.get("/treatmentPlaces/getAll", config);
			if (res.data) {
				console.log(res.data);
				setTreatmentPlaces(res.data);
			}
						
		}
		const fetchData = async() => {
			await fetchPlaceOfTreatments();
			await fetchDataOfUser();
		}
		fetchData();
	},[])

	return (
	<div className="login">
		<span className="loginTitle">Users Info</span>
		<form className="loginForm" onSubmit={handleSubmit} >
			
			<label>Username</label>
			<input
				type="text"
				className="loginInput"
				value={username}				
				disabled={true}

			/>
			
			<label>Name</label>
			<input
				type="text"
				className="loginInput"
				value={name}				
				disabled={true}
			/>
			<label>ID</label>
			<input
				type="text"
				className="loginInput"
				value={id}			
				disabled={true}
			/>	
			<label>Email</label>
			<input
				type="text"
				className="loginInput"
				value={email}			
				disabled={true}
			/>		
			<label>Day of Birth</label>
			<input
				type="text"
				className="loginInput"
				value={dateOfBirth}			
				disabled={true}
			/>
			<label>city</label>
			<select disabled={true} name="city" value={selectedCity} >
				<option value={selectedCity}>{selectedCity}</option>
			</select>
			<select disabled={true} name="district" value={selectedDistrict} >
				<option value={selectedDistrict}>{selectedDistrict}</option>
			</select>
			<select disabled={true} name="ward" value={selectedWard}>
				<option value={selectedWard}>{selectedWard}</option>
			</select>
			<label>State</label>
			<select disabled={!updating} name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
				<option value="F0">F0</option>
				<option value="F1">F1</option>
				<option value="F2">F2</option>
				<option value="F3">F3</option>
			</select>
			<label>Place of treatment</label>
			<select disabled={!updating} name="placeOfTreatment" value={selectedTreatmentPlace} onChange={(e) => setSelectedTreatmentPlace(e.target.value)}>		
				{treatmentPlaces.map((treatmentPlace, key) => {								
					return <option key={key} value={treatmentPlace.name}>{treatmentPlace.name}</option>
				})}
			</select>
			
			<label>Debt</label>
			<input
				type="text"
				className="loginInput"
				value={debt}				
				disabled={true}
			/>

			<button className="loginButton" type="submit" style={{visibility: updating ? 'visible':'hidden'}}>
				Save
			</button>
			<Link className="link" to={`/listRelatedUsers?username=${username}`}>
				<button className="loginButton" >
					Related User View
				</button>
			</Link>

			<Link className="link" to={`/listManagedProcesses?username=${username}`}>
			<button className="loginButton">
				Managed Process View
			</button>
			</Link>

			<Link className="link" to={`/listTransactions?username=${username}`}>
			<button className="loginButton">
				Transaction Process View
			</button>
			</Link>
	
			
			
		</form>     
		<button className="loginButton" onClick={onUpdateBtnClick}>
			Update
		</button>
		{modalNotifyOpen && <NotifyModal 
		setOpenModal={setModalNotifyOpen}		
		messageTitle={"ERROR"} 
		messageBody={"Treatment place is full"}/>}
	</div>
	);
}
