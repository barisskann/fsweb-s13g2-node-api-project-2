// require your server and launch it here
const express = require("express");
const post = require("./api/server");
const app = express();

app.use(express.json());
app.use(post);
app.listen(5000, () => {
  console.log("PORT IS WORKİNG NOW");
});
