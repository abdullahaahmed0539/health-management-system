import React from "react";
import PatientsList from "../components/PatientList";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="mx-4">
      <PatientsList />
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Patient Record 1
        </li>
        <li className="list-group-item">Patient Record 2</li>
        <li className="list-group-item">Patient Record 3</li>
        <li className="list-group-item">Patient Record 4</li>
        <li className="list-group-item">Patient Record 5</li>
      </ul>
    </div>
  );
};

export default HomePage;
