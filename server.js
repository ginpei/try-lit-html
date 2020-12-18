const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.resolve("docs")));

app.listen(port, () => console.log(`Listening at ${port}`));
