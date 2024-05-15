"use client";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { gotoForm, gotoDetails } from "./action";
import { redirect } from "next/dist/server/api-utils";
const ABI = require("./abi.json");

const page = () => {
  const [data, setData] = useState({});
  const [loading, setLoadig] = useState(true);

  let address;
  useEffect(() => {
    const y = async () => {
      if (typeof window !== "undefined") {
        const web3 = new Web3(window.ethereum);
        // const networkID = await web3.eth.net.getId();
        // if (networkID !== "5777") {
        //   alert("please change metamask acount to ganache imported acount ");
        //   return;
        // }
        // const networkID = await web3.eth.net.getId();
        // address = artifact.networks[networkID].address;
        address = process.env.NEXT_PUBLIC_CONTRACT;
        const accountscount = await web3.eth.requestAccounts();
        const contract = new web3.eth.Contract(ABI, address);
        const hashes = await contract.methods.getAllObjects().call();
        setData(hashes);
        setLoadig(false);
      }
    };
    y();
  }, []);
  return (
    <div className="container mx-auto px-4">
      <div
        className="absolute top-4 right-7 bg-blue-500 px-4 py-[0.35rem] text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-300"
        onClick={() => {
          gotoForm();
        }}
      >
        Create New NFT
      </div>
      <div className="text-3xl font-bold mb-4 text-center mt-5 ">NFTs</div>
      {loading ? (
        <p>
          Please Install Metamask and switch acount to sepolia or try to refresh
          1 or 2 times only
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {data.map((item, index) => (
            <div
              onClick={() => {
                // gotoForm();
                gotoDetails(item.imageUrl);
                // redirect("/form");
              }}
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              <img
                src={`https://gateway.pinata.cloud/ipfs/${item.imageUrl}`}
                alt={item.name}
                className="mt-2 w-full h-40 object-contain"
              />
              <h2 className="text-lg font-semibold">Name: {item.name}</h2>
              <p className="text-gray-500">Symbol: {item.symbol}</p>
              <p
                className="text-gray-500 mt-2 overflow-auto"
                style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
              >
                Token_Id:{item.imageUrl}
              </p>
              <p
                className="text-gray-500 mt-2 overflow-auto"
                style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
              >
                Owner:{item.owner}
              </p>
              <p
                className="text-gray-500 mt-2 overflow-auto"
                style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
              >
                Token_URL:https://puffles-silk.vercel.app/id/{item.imageUrl}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
