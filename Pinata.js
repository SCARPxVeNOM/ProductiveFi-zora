// uploadToPinata.js
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkY2FjMTQwMS04NDcxLTQ1YmQtODBlNC1iYzI0Zjg1NGU5MmIiLCJlbWFpbCI6InByYXRpa2t1bWFyNTY3NzhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE4OWYzYTQ1YmIwMGI4NjMyMGI0Iiwic2NvcGVkS2V5U2VjcmV0IjoiYmUwOGQwMDg4MjljMDJkNzNlZjQ4YzhmZWJlMjVlNzBkY2FmMGMyZDAxMTVkODNhYWJjMjhhNWYxZGQxZDliMiIsImV4cCI6MTc3NzY1MzkwMn0.Jgk9Br2_hOdu1n10b41FnINL82lQJbhv1W0A3Jocrc0";

async function verifyPinataConnection() {
  try {
    const res = await axios.get("https://api.pinata.cloud/data/testAuthentication", {
      headers: {
        "Authorization": `Bearer ${PINATA_JWT}`
      }
    });
    console.log("✅ Pinata Connection Successful!");
    console.log("Account Status:", res.data);
    return true;
  } catch (error) {
    console.error("❌ Pinata Connection Failed:", error.response ? error.response.data : error.message);
    return false;
  }
}

async function uploadToPinata(filePath) {
  // First verify the connection
  const isConnected = await verifyPinataConnection();
  if (!isConnected) {
    console.error("Please check your Pinata JWT token and try again.");
    return;
  }

  const data = new FormData();
  data.append("file", fs.createReadStream(filePath));

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: "Infinity",
      headers: {
        "Authorization": `Bearer ${PINATA_JWT}`,
        ...data.getHeaders(),
      },
    });

    console.log("✅ File uploaded to IPFS via Pinata!");
    console.log("IPFS Hash (CID):", res.data.IpfsHash);
    console.log("Access at: ipfs://" + res.data.IpfsHash);
    return res.data.IpfsHash;
  } catch (error) {
    console.error("❌ Error uploading to Pinata:", error.message);
  }
}

// First verify the connection, then try to upload
verifyPinataConnection().then(() => {
  uploadToPinata(path.join(__dirname, "metadata.json"));
});
