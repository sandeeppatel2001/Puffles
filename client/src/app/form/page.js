// Import necessary libraries
"use client";
import { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import { gotoDisplay } from "../action";
// const artifact = require("../../../../builds/contracts/HashStorage.json");
// const ABI = artifact.abi;
const ABI = require("../abi.json");
console.log(ABI);
export default function NFTForm() {
  // State variables to store form inputs
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [randomText, setRandomText] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);
  const [disable, setDisable] = useState(false);
  // const web3 = new Web3(window.ethereum);
  let web3;
  if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }

  const handleFileUpload = async (event) => {
    const uploadedImage = event.target.files[0]; // Get the uploaded file
    setImage(uploadedImage);
    if (!uploadedImage) return; // If no file is selected, return
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(uploadedImage);
    reader.onloadend = () => {
      console.log("onload");
      setFile(event.target.files[0]);
    };
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    // Do something with the form data, like submitting to a backend or logging to console
    console.log("Form submitted:", { name, symbol, imageUrl, randomText });
    // Optionally, you can reset the form inputs after submission

    const formData = new FormData();
    formData.append("file", file);
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: `54f6e081790bced0a043`,
        pinata_secret_api_key: `
        b7d01d4986ceae565cca49df552d74b6f000081381d1ea567680ea78a81ea12e`,
        "Content-Type": "multipart/form-data",
      },
    });
    const ImgHash = ` https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
    console.log(ImgHash);
    // const networkID = await web3.eth.net.getId();
    // if (networkID !== "5777") {
    //   alert("please change metamask acount to ganache imported acount ");
    //   return;
    // }

    // const networkID = await web3.eth.net.getId();
    // const address = artifact.networks[networkID].address;
    const address = process.env.NEXT_PUBLIC_CONTRACT;
    const contract = new web3.eth.Contract(ABI, address);
    const accountscount = await web3.eth.requestAccounts();
    console.log(accountscount);

    await contract.methods
      .storeObject(name, `${resFile.data.IpfsHash}`, symbol, accountscount[0])
      .send({ from: accountscount[0] });

    const hashes = await contract.methods.getAllObjects().call();
    console.log("aaaaa", hashes);

    setName("");
    setSymbol("");
    setDisable(false);
    gotoDisplay();
  };
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md w-full">
        <h1 className="text-red-500 text-2xl mb-4">Create NFT</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm">
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          {/* Symbol Input */}
          <div className="flex flex-col">
            <label htmlFor="symbol" className="text-sm">
              Symbol:
            </label>
            <input
              id="symbol"
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm">
              Image:
            </label>
            <input
              id="image"
              type="file"
              onChange={handleFileUpload}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            disabled={disable}
          >
            Create NFT
          </button>
        </form>
      </div>
    </div>
  );
}
