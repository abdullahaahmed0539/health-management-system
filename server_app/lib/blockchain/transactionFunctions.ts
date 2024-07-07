// Import necessary modules
import dotenv from "dotenv";
import Web3 from "web3";
import fs from "fs";
import path from "path";
import exp from "constants";

// Load environment variables from .env file
dotenv.config();

// Initialize Web3
const web3 = new Web3(process.env.GANACHE_IP as string);

// Read the ABI from the compiled contract JSON file
const contractPath = path.resolve(
  __dirname,
  "../../../ganache_contracts/client/src/contracts/MedicalRecords.json"
);
const contractABI = JSON.parse(fs.readFileSync(contractPath, "utf8")).abi;
const privateKey = process.env.GANACHE_PRIVATE_KEY as string;
const contractAddress = process.env.CONTRACT_ADDRESS as string;

// Get the account from the private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// Initialize the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function addUser(
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  city: string,
  userAddress: string,
  role: string,
  country: string,
  gender: string,
  phoneNumbers: string
) {
  try {
    const tx = contract.methods.addUser(
      userId,
      firstName,
      lastName,
      email,
      dateOfBirth,
      city,
      userAddress,
      role,
      country,
      gender,
      phoneNumbers
    );

    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();

    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 1337, // Ganache default network ID
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction receipt: ", receipt);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

async function getUser(userId: string) {
  try {
    const user = await contract.methods.getUser(userId).call();
    console.log("User: ", user);
    return user;
  } catch (error) {
    console.error("Error getting user: ", error);
  }
}

async function addPatient(
  userId: string,
  patientId: string,
  treatmentName: string,
  diseaseName: string,
  doctorName: string,
  treatmentDate: string,
  guardianName: string,
  guardianEmail: string,
  guardianPhone: string,
  guardianRelation: string
) {
  try {
    const tx = contract.methods.addPatient(
      userId,
      patientId,
      treatmentName,
      diseaseName,
      doctorName,
      treatmentDate,
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianRelation
    );

    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();

    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 1337, // Ganache default network ID
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction receipt: ", receipt);
  } catch (error) {
    console.error("Error adding patient: ", error);
  }
}

async function getPatient(patientId: string) {
  try {
    const patient = await contract.methods.getPatient(patientId).call();
    console.log("Patient: ", patient);
    return patient;
  } catch (error) {
    console.error("Error getting patient: ", error);
  }
}

async function addTreatmentToPatient(
  patientId: string,
  treatmentName: string,
  diseaseName: string,
  doctorName: string,
  treatmentDate: string
) {
  try {
    const tx = contract.methods.addTreatmentToPatient(
      patientId,
      treatmentName,
      diseaseName,
      doctorName,
      treatmentDate
    );

    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();

    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 1337, // Ganache default network ID
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction receipt: ", receipt);
  } catch (error) {
    console.error("Error adding treatment to patient: ", error);
  }
}

async function addGuardianToPatient(
  patientId: string,
  guardianName: string,
  guardianEmail: string,
  guardianPhone: string,
  guardianRelation: string
) {
  try {
    const tx = contract.methods.addGuardianToPatient(
      patientId,
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianRelation
    );

    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();

    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 1337, // Ganache default network ID
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction receipt: ", receipt);
  } catch (error) {
    console.error("Error adding guardian to patient: ", error);
  }
}

async function getAllUsers() {
  try {
    const users = await contract.methods.getAllUsers().call();
    console.log("All Users: ", users);
    return users;
  } catch (error) {
    console.error("Error getting all users: ", error);
  }
}

async function getAllPatients() {
  try {
    const patients = await contract.methods.getAllPatients().call();
    console.log("All Patients: ", patients);
    return patients;
  } catch (error) {
    console.error("Error getting all patients: ", error);
  }
}

export {
    getAllPatients,
    getAllUsers,
    getPatient,
    getUser,
    addGuardianToPatient,
    addTreatmentToPatient,
    addUser,
    addPatient
};