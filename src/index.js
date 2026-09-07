require("dotenv").config();

const express = require("express");

const tapRoutes = require("./routes/tapRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(tapRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
    console.log(`EasyTap API escuchando en el puerto ${PORT}`);
});
