import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import "./createUsers.css";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";


export default function CreateUsers() {

	const usernameRef = useRef();	
	const nameRef = useRef();
	const idRef = useRef();
	const emailRef = useRef();
	const birthRef = useRef();
	const { token, isFetching } = useContext(Context);
	const history = useHistory();

	const [cities, setCities] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	const [treatmentPlaces, setTreatmentPlaces] = useState([]);
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [selectedWard, setSelectedWard] = useState('');
	const [selectedState, setSelectedState] = useState('F0');
	const [selectedTreatmentPlace, setSelectedTreatmentPlace] = useState('');
	
	const [modalNotifyOpen, setModalNotifyOpen] = useState(false);

	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	
	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {			
			const res = await axios.post("/users/create", {
				username: usernameRef.current.value,				
				name: nameRef.current.value,
				identityCard: idRef.current.value,
				email: emailRef.current.value,
				dateOfBirth: birthRef.current.value,
				address: {city: selectedCity, district: selectedDistrict, ward: selectedWard},
				state: selectedState,
				placeOfTreatment: selectedTreatmentPlace

			}, config);
			if (res.data && res.data.treatmentPlaceIsFull) {
				setModalNotifyOpen(true);
				return;
			}
			window.location.replace(`/listRelatedUsers?username=${usernameRef.current.value}`);
		} catch (err) {
			console.log(err.response.data)			
		}
	};
	
	const onChangeCity = (e) => {		
		//set selected district
		setSelectedCity(e.target.value);
		const selectedCity = cities.filter((city) => city.name === e.target.value)[0];
		//init districts
		setDistricts(selectedCity.districts);
		setSelectedDistrict(districts[0].name);
		//init wards
		setWards(selectedCity.districts[0].wards);
		setSelectedWard(wards[0].name);		
	}

	const onChangeDistrict = (e) => {		
		//set selected district
		setSelectedDistrict(e.target.value);		
		const selectedDistrict = districts.filter((district) => district.name === e.target.value)[0];
		//init wards
		setWards(selectedDistrict.wards);
		setSelectedWard(wards[0].name);	
	}

	useEffect(() => {		
		
		const fetchCities = async () => {
			try {				
				const res = await axios.get("/addresses/getAll", config);					
				if (res.data) {
					//set city
					setCities(res.data);;
					setSelectedCity(res.data[0].name);
					//init districts
					setDistricts(res.data[0].districts);;				
					setSelectedDistrict(res.data[0].districts[0].name);
					//init wards
					setWards(res.data[0].districts[0].wards);
					setSelectedWard(res.data[0].districts[0].wards[0].name);						
				}
				
			} catch (err) {				
				console.log(err);
			}			
		};
		const fetchPlaceOfTreatments = async() => {
			const res = await axios.get("/treatmentPlaces/getAll", config);
			setTreatmentPlaces(res.data);
			setSelectedTreatmentPlace(res.data[0].name);
		}			
		fetchCities();		
		fetchPlaceOfTreatments();
	},[])

	return (
	<div className="login">
		<span className="loginTitle">Add New Users</span>
		<form className="loginForm" onSubmit={handleSubmit}>
		<label>Username</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter username..."
			ref={usernameRef}
		/>		
		<label>Name</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter name..."
			ref={nameRef}
		/>
		<label>ID</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter ID..."
			ref={idRef}
		/>	
		<label>Email</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter email (if have)..."
			ref={emailRef}
		/>		
		<label>Day of Birth</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter day of Birth..."
			ref={birthRef}
		/>
		<label>city</label>
		<select name="city" value={selectedCity} onChange={(e) => onChangeCity(e)}>
			{cities.map((city, key) => {								
				return <option key={key} value={city.name}>{city.name}</option>
			})}
  		</select>
		<select name="district" value={selectedDistrict} onChange={(e) => onChangeDistrict(e)}>
			{districts.map((district, key) => {								
				return <option key={key} value={district.name}>{district.name}</option>
			})}
		</select>
		<select name="ward" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
			{wards.map((ward, key) => {								
				return <option key={key} value={ward.name}>{ward.name}</option>
			})}
  		</select>
		<label>State</label>
		<select name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
			<option value="F0">F0</option>
			<option value="F1">F1</option>
			<option value="F2">F2</option>
			<option value="F3">F3</option>
  		</select>
		<select name="placeOfTreatment" value={selectedTreatmentPlace} onChange={(e) => setSelectedTreatmentPlace(e.target.value)}>		
			{treatmentPlaces.map((treatmentPlace, key) => {								
				return <option key={key} value={treatmentPlace.name}>{treatmentPlace.name}</option>
			})}
  		</select>
				

		
		<button className="loginButton" type="submit">
			Next
		</button>
		
		
		</form>     
		{modalNotifyOpen && <NotifyModal 
		setOpenModal={setModalNotifyOpen}		
		messageTitle={"ERROR"} 
		messageBody={"Treatment place is full"}/>}
	</div>
	);
}
