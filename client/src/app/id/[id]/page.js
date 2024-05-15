"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
const ABI = require("../../abi.json");
import Web3 from "web3";
export default function ShowId() {
  const { id } = useParams();
  const [nftData, setNftData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountscount, setAccountscount] = useState("");
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
        // console.log("ssssssssssssssss", process.env);
        address = process.env.NEXT_PUBLIC_CONTRACT;
        const accounts = await web3.eth.requestAccounts();
        setAccountscount(accounts[0]);
        // console.log(accountscount);
        const contract = new web3.eth.Contract(ABI, address);
        const hashes = await contract.methods.getAllObjects().call();
        // setData(hashes);
        const { name, description, imageUrl, owner } = hashes.filter(
          (obj) => obj.imageUrl === id
        )[0];
        const obj = {
          name,
          description: "This is Description",
          image: `https://gateway.pinata.cloud/ipfs/${id}`,
          owner,
        };

        setNftData(obj);
        setLoading(false);
      }
    };
    y();
  }, []);
  // useEffect(() => {
  //   // Function to fetch NFT details
  //   const fetchNftDetails = async () => {
  //     try {
  //       // Replace with your actual API endpoint to fetch NFT details
  //       const response = await fetch(`/api/nfts/${id}`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setNftData(data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchNftDetails();
  //   }
  // }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>NFT Details</h1>
      {nftData ? (
        <div style={styles.card}>
          <h2 style={styles.nftName}>{nftData.name}</h2>
          <img src={nftData.image} alt={nftData.name} style={styles.image} />
          <p style={styles.description}>{nftData.description}</p>
          <p
            className="text-gray-500 mt-2 overflow-auto"
            style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
          >
            Token_Id: {id}
          </p>
          <p
            className="text-gray-500 mt-2 overflow-auto"
            style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
          >
            Owner: {nftData.owner}
          </p>
          <p
            className="text-gray-500 mt-2 overflow-auto w-96"
            style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
          >
            Token_URL:http://localhost:3000/id/{id}
          </p>
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onClick={() => {
                if (accountscount[0] !== nftData.owner) {
                }
                alert("You Are Not Allowed This Action");
                return;
              }}
            >
              Buy
            </button>
            <button
              style={styles.button}
              onClick={() => {
                // console.log("ttttttttttttttt", accountscount);
                if (accountscount[0] !== nftData.owner) {
                }
                alert("You Are Not The Owner Of This NFTs");
                return;
              }}
            >
              Sell
            </button>
          </div>
        </div>
      ) : (
        <div>No NFT data found</div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  nftName: {
    fontSize: "1.5rem",
    margin: "10px 0",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

// Adding hover effect using inline styles in React
const buttonStyle = {
  ...styles.button,
  ":hover": {
    backgroundColor: styles.buttonHover.backgroundColor,
  },
};
