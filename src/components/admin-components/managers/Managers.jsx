import Manager from "../manager/Manager";
import "./managers.css";

export default function Managers({ managers }) {
  return (
    <div className="posts">
      {managers.map((m) => (
        <Manager key={m._id} manager={m} />
      ))}
    </div>
  );
}
