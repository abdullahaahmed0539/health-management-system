import { useEffect, useState } from "react";
import { RawProfileData } from "../models/User";
import { Table } from "react-bootstrap";
import { fetchUsers } from "../services/UserService";

interface Props {}

const UserList = (props: Props) => {
  const [users, setUsers] = useState<RawProfileData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserList = async () => {
      const result = await fetchUsers();
      setUsers(result);
    };
    getUserList();
    // console.log(users);
  }, []);

  return (
    <>
      <h1>User List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.firstName.concat(" ", user.lastName)}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
