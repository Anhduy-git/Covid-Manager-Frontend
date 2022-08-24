import TreatmentPlace from "../treatment-place/TreatmentPlace";
import "./treatmentPlaces.css";

export default function TreatmentPlaces({ treatmentPlaces }) {
  return (
    <div className="posts">
      {treatmentPlaces.map((tp) => (
        <TreatmentPlace treatmentPlace={tp} />
      ))}
    </div>
  );
}
