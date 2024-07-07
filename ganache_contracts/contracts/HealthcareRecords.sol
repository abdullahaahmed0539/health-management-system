// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MedicalRecords {
    struct User {
        string firstName;
        string lastName;
        string email;
        string dateOfBirth;
        string city;
        string userAddress; // Renamed from 'address' to 'userAddress'
        string role;
        string country;
        string gender;
        string phoneNumbers;
    }

    struct Treatment {
        string name;
        string diseaseName;
        string doctorName;
        string treatmentDate;
    }

    struct Guardian {
        string name;
        string email;
        string phone;
        string relation;
    }

    struct Patient {
        string userId;
        Treatment[] treatmentHistory;
        Guardian[] guardianInfo;
    }

    mapping(string => User) private users;
    mapping(string => Patient) private patients;
    string[] private userIDs; // Array to store all user IDs
    string[] private patientIDs; // Array to store all patient IDs

    // Function to add a user
    function addUser(
        string memory userId,
        string memory firstName,
        string memory lastName,
        string memory email,
        string memory dateOfBirth,
        string memory city,
        string memory userAddress,
        string memory role,
        string memory country,
        string memory gender,
        string memory phoneNumbers
    ) public {
        // Check if user already exists
        require(!userExists(userId), "User with this ID already exists");

        users[userId] = User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            city: city,
            userAddress: userAddress,
            role: role,
            country: country,
            gender: gender,
            phoneNumbers: phoneNumbers
        });
        
        userIDs.push(userId); // Add userId to the array of userIDs
    }

    // Function to get a user by userId
    function getUser(string memory userId) public view returns (User memory) {
        return users[userId];
    }

    // Function to add a patient
    function addPatient(
        string memory userId,
        string memory patientId,
        string memory treatmentName,
        string memory diseaseName,
        string memory doctorName,
        string memory treatmentDate,
        string memory guardianName,
        string memory guardianEmail,
        string memory guardianPhone,
        string memory guardianRelation
    ) public {
        // Check if patient already exists
        require(bytes(patients[userId].userId).length == 0, "Patient already exists");

        // Check if the user exists
        require(bytes(users[userId].firstName).length > 0, "User does not exist");

        patients[userId].userId = userId;

        addTreatmentToPatient(userId, treatmentName, diseaseName, doctorName, treatmentDate);

        addGuardianToPatient(userId, guardianName, guardianEmail, guardianPhone, guardianRelation);

        patientIDs.push(patientId); // Add patientId to the array of patientIDs
    }

    // Function to add treatment to a patient
    function addTreatmentToPatient(
        string memory patientId,
        string memory treatmentName,
        string memory diseaseName,
        string memory doctorName,
        string memory treatmentDate
    ) private {
        

        Treatment memory treatment = Treatment({
            name: treatmentName,
            diseaseName: diseaseName,
            doctorName: doctorName,
            treatmentDate: treatmentDate
        });

        patients[patientId].treatmentHistory.push(treatment);
    }

    // Function to add guardian to a patient
    function addGuardianToPatient(
        string memory patientId,
        string memory guardianName,
        string memory guardianEmail,
        string memory guardianPhone,
        string memory guardianRelation
    ) private {
 

        Guardian memory guardian = Guardian({
            name: guardianName,
            email: guardianEmail,
            phone: guardianPhone,
            relation: guardianRelation
        });

        patients[patientId].guardianInfo.push(guardian);
    }

    // Function to get a patient by patientId
    function getPatient(string memory patientId) public view returns (Patient memory) {
        return patients[patientId];
    }

    // Function to retrieve all users
    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userIDs.length);
        for (uint i = 0; i < userIDs.length; i++) {
            allUsers[i] = users[userIDs[i]];
        }
        return allUsers;
    }

    // Function to retrieve all patients
    function getAllPatients() public view returns (Patient[] memory) {
        Patient[] memory allPatients = new Patient[](patientIDs.length);
        for (uint i = 0; i < patientIDs.length; i++) {
            allPatients[i] = patients[patientIDs[i]];
        }
        return allPatients;
    }

    // Function to check if a user exists
    function userExists(string memory userId) public view returns (bool) {
        return bytes(users[userId].firstName).length > 0;
    }
}