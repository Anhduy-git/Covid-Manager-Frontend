import { useEffect, useState, useContext } from "react";
import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import Necessaries from "../../../components/manager-components/necessaries/Necessaries";
import "./listNecessaries.css";
import axios from "axios";
import { Context } from "../../../context/Context";
import { Link, useLocation, useHistory } from "react-router-dom";
import { rectangle2, account, manage, location, register } 
	from "../../../assets";
import Topbar from "../../../components/topbar/TopBar";

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
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>   
			{/* Page Wrapper */}
			<div id="wrapper">
			<ManagerSidebar />
			{/* Content Wrapper */}
			<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<Topbar />  
				<div class="container-fluid">

                <!-- Page Heading -->
                <!-- <h1 class="h3 mb-4 text-gray-800">Blank Page</h1> -->
                <h1 class="h3 mb-4 text-gray-800 text-center"><strong>Chi tiết về gói sản phẩm</strong></h1>
                <div class="overflow-scroll main-content">
                    <div class="row">
                        <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
                            
                            <div class="card">
                                <div class="d-flex justify-content-between p-3">
                                <p class="lead mb-0">Cá lóc</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" class="card-img-top" alt="Laptop" />
                                <div class="card-body">

                                <div class="d-flex justify-content-between mb-3">
                                    <h5 class="mb-0"> Số lượng :</h5>
                                    <h5 class="text-dark mb-0">1 kg</h5>
                                </div>
                    
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Giá cả: <span class="fw-bold">50.000VND</span></p>
                                </div>
                                </div>
                            </div>
                       
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4 mb-md-0">
                        <div class="card">
                            <div class="card">
                                <div class="d-flex justify-content-between p-3">
                                <p class="lead mb-0">Cá lóc</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" class="card-img-top" alt="Laptop" />
                                <div class="card-body">
    
                                <div class="d-flex justify-content-between mb-3">
                                    <h5 class="mb-0"> Số lượng :</h5>
                                    <h5 class="text-dark mb-0">1 kg</h5>
                                </div>
                    
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Giá cả: <span class="fw-bold">50.000VND</span></p>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4 mb-md-0">
                        <div class="card">
                            <div class="card">
                                <div class="d-flex justify-content-between p-3">
                                <p class="lead mb-0">Cá lóc</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" class="card-img-top" alt="Laptop" />
                                <div class="card-body">
    
                                <div class="d-flex justify-content-between mb-3">
                                    <h5 class="mb-0"> Số lượng :</h5>
                                    <h5 class="text-dark mb-0">1 kg</h5>
                                </div>
                    
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Giá cả: <span class="fw-bold">50.000VND</span></p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
                            
                            <div class="card">
                                <div class="d-flex justify-content-between p-3">
                                <p class="lead mb-0">Cá lóc</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" class="card-img-top" alt="Laptop" />
                                <div class="card-body">

                                <div class="d-flex justify-content-between mb-3">
                                    <h5 class="mb-0"> Số lượng :</h5>
                                    <h5 class="text-dark mb-0">1 kg</h5>
                                </div>
                    
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Giá cả: <span class="fw-bold">50.000VND</span></p>
                                </div>
                                </div>
                            </div>
                       
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4 mb-md-0">
                        <div class="card">
                            <div class="card">
                                <div class="d-flex justify-content-between p-3">
                                <p class="lead mb-0">Cá lóc</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" class="card-img-top" alt="Laptop" />
                                <div class="card-body">
    
                                <div class="d-flex justify-content-between mb-3">
                                    <h5 class="mb-0"> Số lượng :</h5>
                                    <h5 class="text-dark mb-0">1 kg</h5>
                                </div>
                    
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Giá cả: <span class="fw-bold">50.000VND</span></p>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4 mb-md-0">
                        <div class="card">
                            <div class="card">
                                <div class="d-flex justify-content-between p-3">
                                <p class="lead mb-0">Cá lóc</p>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" class="card-img-top" alt="Laptop" />
                                <div class="card-body">
    
                                <div class="d-flex justify-content-between mb-3">
                                    <h5 class="mb-0"> Số lượng :</h5>
                                    <h5 class="text-dark mb-0">1 kg</h5>
                                </div>
                    
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="text-muted mb-0">Giá cả: <span class="fw-bold">50.000VND</span></p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
				{/* /.container-fluid */}
			
					{/* End of Main Content */}
				</div>
				{/* End of Content Wrapper */}
				</div>        
			</div>			
		</div>
	);
}





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