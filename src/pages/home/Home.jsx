
import Header from "../../components/header/Header";
import AdminFeatures from "../../components/admin-components/features/AdminFeatures";
import ManagerFeatures from "../../components/manager-components/features/ManagerFeatures";
import UserFeatures from "../../components/user-components/features/UserFeatures";
import AdminSidebar from "../../components/admin-components/admin-sidebar/AdminSidebar"
import ManagerSidebar from "../../components/manager-components/manager-sidebar/ManagerSidebar";
import UserSidebar from "../../components/user-components/user-sidebar/UserSidebar";

import "./home.css";



import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Home() {	
	const { user, priority } = useContext(Context);

	console.log('User: ', user);
	console.log('Priority: ', priority);

	return (
	<>
		<Header />
		<div className="home">
		{priority == 0 && <AdminFeatures />}
		{priority == 1 && <ManagerFeatures />}
		{priority == 2 && <UserFeatures />}		

		{priority == 0 && <AdminSidebar />}
		{priority == 1 && <ManagerSidebar />}
		{priority == 2 && <UserSidebar />}		
		</div>
	</>
	);
}
