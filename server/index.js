// server/index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// Ignore SSL errors
const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.get("/phonelist", async (req, res) => {
  try {
    const searchText = req.query.search || "";
    const response = await axios.get(
      `https://prueba-tecnica-api-tienda-moviles.onrender.com/products${searchText ? `?search=${searchText}` : ""}`,
      {
        headers: {
          "x-api-key": "87909682e6cd74208f41a6ef39fe4191",
        },
        httpsAgent: agent,
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
