'use client'
import styles from "./styles/page.module.css";
import Web3 from "web3";
import MockupContract from "../contracts/MockupContract.json";
import { useState, useEffect } from "react";

export default function Home() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState("nill");
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      //console.log(web3)
      // To interact with smart contract: ABI, contract adress
      const networkID = await web3.eth.net.getId();
      console.log(networkID);
      const deployedNetwork = MockupContract.networks[networkID];
      console.log(deployedNetwork.address);
      const contract = new web3.eth.Contract(
        MockupContract.abi,
        deployedNetwork.address
      );
      console.log(contract); //instance of our contract with whom we are going to make the interaction
      setState({ web3: web3, contract: contract });
      //console.log(state);
    }
    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = state;
    async function readData() {
      const data = await contract.methods.getter().call();
      setData(data.toString());
      console.log(data.toString());
    }
    contract && readData();
  }, [state]);

  async function writeData() {
    const { contract } = state;
    const data = document.querySelector("#value").value;
    await contract.methods
      .setter(data)
      .send({ from: "0xd416F57F15C26abEDD8E77d933b701D293e9bfee" }); // This is the address of the account that is going to interact with the contract
    window.location.reload();
  }
  return (
    <main>
      <div>
          <p>Contract Data: {data}</p>
          <div>
            <input type="text" id="value" required="required"></input>
          </div>
          <br></br>
          <button onClick={writeData}>Change Data</button>
        </div>
    </main>
  );
}
