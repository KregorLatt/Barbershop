const app = require ('express')()
const port =8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/barber", (req,res)=> {
    res.send([
        {id:1,name:"Maire"},
        {id:1,name:"Kalle"}
    ])    
})

app.listen(port, () => {
    console.log(`Api up at: http://localhost:${port}`)
})