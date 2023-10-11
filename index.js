const express = require ('express')()
const app = express()
const port =8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");
const yamljs = require("yamljs")
const swaggerDocument=yamljs.load("./docs/swagger.yaml");
const services = require("./services/data")
app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

const services = [
    {id:1,Service_name:"Kaire",Price:10,Description:"Masinlõikus"},
    {id:2,Service_name:"Maire",Price:20,Description:"Värvimine"},
    {id:1,Service_name:"Juss",Price:25,Description:"Masinlõikus"},
    {id:1,Service_name:"Maiko",Price:50,Description:"Keemilised lokid"}
   
]

app.get("/services", (req, res) => {
    res.send (services)
})

app.get("/services/:id" , (req, res) => {
    res.send(services[req.params.id])
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})