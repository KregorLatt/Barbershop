require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")

const swaggerDocument=yamljs.load("./docs/swagger.yaml");
const services = require("./services/data")
app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

 GetServiceDetails
app.get("/services", (req, res) => {
    res.send(services.getAll())
})

app.get("/services/:id" , (req, res) => {
    res.send(services.getById(req.params.id))
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const barbers = [
    {id:1,name:"Kaire",Contact_details:"Kaire@gmail.com"},
    {id:2,name:"Maire",Contact_details:"Maire@gmail.com"},
    {id:3,name:"Toomas",Contact_details:"Toomas@gmail.com"},
    {id:4,name:"Lauri",Contact_details:"Lauri@gmail.com"}
   
]




app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

require("./routes/barberRoutes")(app)



app.listen(port, () => {
    require("./db").sync()
        .then(console.log("Synchronized"))
        .catch((error) => console.log("Error:", error))
    console.log(`API up at: http://localhost:${port}`);

})

app.post("/barbers", (req, res) => {
    if (!req.body.name || !req.body.Contact_details) {
        return res.status(400).send({ error: "One or all required parameters are missing." })
    }
    const createdBarber = barbers.create({
        name: req.body.name,
        Contact_details: req.body.Contact_details
    })
    res.status(201)
        .location(`${getBaseurl(req)}/barbers/${createdBarber.id}`)
        .send(createdBarber)
})
function getBaseurl (request){
    return (request.connection && request.connection.encrypted ? "https" : "http") 
            + "://" + request.headers.host
}
main


app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);

})