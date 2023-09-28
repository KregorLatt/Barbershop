const app = require ('express')()
const port =8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");
const yamljs = require("yamljs")
const swaggerDocument=yamljs.load("./docs/swagger.yaml");

app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

const barbers = [
    {id:1,name:"Kaire",Contact_details:"Kaire@gmail.com"},
    {id:2,name:"Maire",Contact_details:"Maire@gmail.com"},
    {id:3,name:"Toomas",Contact_details:"Toomas@gmail.com"},
    {id:4,name:"Lauri",Contact_details:"Lauri@gmail.com"}
    
]


app.get("/barber", (req,res)=> {
    res.send([
        {id:1,name:"Maire"},
        {id:2,name:"Kalle"}
    ])    
})

app.get('/barbers/:id', (req,res) => {
    if (typeof barber[req.params.id -1] === 'undefined'){
        return res.status(404).send({error:"Game not found"})
    }
    res.send(games[req.params.id -1 ])
})

app.get('/barbers/:id', (req,res) => {
    res.send(games[req.params.id - 1 ])
})

app.listen(port, () => {
    console.log(`Api up at: http://localhost:${port}`)
})




