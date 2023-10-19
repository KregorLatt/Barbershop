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

 CreateService

 GetAllServices
 main
const services = [
    {id:1,Service_name:"Kaire",Price:10,Description:"Masinlõikus"},
    {id:2,Service_name:"Maire",Price:20,Description:"Värvimine"},
    {id:1,Service_name:"Juss",Price:25,Description:"Masinlõikus"},
    {id:1,Service_name:"Maiko",Price:50,Description:"Keemilised lokid"}
   
]

 CreateService


 GetServiceDetails
 main
 main
app.get("/services", (req, res) => {
    res.send (services)
})

app.get("/services/:id" , (req, res) => {
    res.send(services[req.params.id])
})
 CreateService

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})

app.post("/services", (req, res) => {
    if (!req.body.Service_name || !req.body.Description) {
        return res.status(400).send({ error: "One or all required parameters are missing." })
    }
    const createdService = services.create({
        Service_name: req.body.Service_name,
        Description: req.body.Description
    })
    res.status(201)
        .location(`${getBaseurl(req)}/services/${createdService.id}`)
        .send(createdService)


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
main
})
function getBaseurl (request){
    return (request.connection && request.connection.encrypted ? "https" : "http") 
            + "://" + request.headers.host
 CreateService
}

}
main

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
<<<<<<< HEAD

})
=======
})
 main
>>>>>>> 55cc974bab092bbbc9ebc915208d3fcfe650d2b5
