import React from 'react';
import { Table, Alert } from "react-bootstrap";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
    if (!users || users.length === 0) {
        return <Alert variant="info">No users</Alert>;
    }

    return (
        <>
            <h1>User List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default UserList;

