import React from "react";
import PatientsList from "../components/PatientList";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="mx-4">
      <PatientsList />
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
        Open Treatment 1
        </li>
        <li className="list-group-item">Open Treatment 2</li>
        <li className="list-group-item">Open Treatment 3</li>
        <li className="list-group-item">Open Treatment 4</li>
        <li className="list-group-item">Open Treatment 5</li>
      </ul>
    </div>
  );
};

export default HomePage;
