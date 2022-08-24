import User from "../user/User";
import "./users.css";

export default function Users({ users, searchTerm }) {	
  return (
    <div className="posts">
		{users.map((u) => (
			u.identityCard.includes(searchTerm) && <User key={u._id} user={u}/>
		))}
    </div>
  );
}
