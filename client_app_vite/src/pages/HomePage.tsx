import React, { useEffect, useState } from "react";
import PatientsList from "../components/PatientList";
import { UserRole } from "../models/Roles";
import { UserProfile } from "../models/User";
import { getUserFromLocalStorage } from "../utilities/LocalStorageUtils";

type Props = {
};

const HomePage = ({}: Props) => {
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string; role: string } | null>(null);
  console.log("HomePage");

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="mx-4">
      {user?.role === UserRole.Admin && <><p>Welcome, Admin!</p><PatientsList /></>}
      {user?.role  === UserRole.Doctor && <><p>Welcome, Doctor!</p><PatientsList /></>}
      {user?.role  === UserRole.Staff && <><p>Welcome, Staff!</p><PatientsList /></>}
      {user?.role  === UserRole.Guest && <p>Welcome, Guest!</p>}
      {user?.role  === UserRole.Basic && <p>Welcome, Basic!</p>}
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
