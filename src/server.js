const express = require("express")
const server = express()
const routes = require("./routes.js")
const PORT = 3000
const path = require("path")

server.set("view engine", "ejs")

server.set('views', path.join(__dirname, 'views'))

server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

server.use(routes)

server.listen(PORT, () => console.log("Server on"))

