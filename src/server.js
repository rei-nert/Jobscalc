const express = require("express")
const server = express()
const routes = require("./routes.js")

server.set("view engine", "ejs")

server.use(express.static("public"))

server.use(routes)

server.listen(3000, () => console.log("Server on"))

