const express = require ('express')()
const app = express()
const port =8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");
const yamljs = require("yamljs")
const swaggerDocument=yamljs.load("./docs/swagger.yaml");
const barbers = require("./Barbers/data")
app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

app.get("/barbers", (req, res) => {
    res.send(barbers.getAll())
})

app.get("/barbers/:id" , (req, res) => {
    res.send(barbers.getById(req.params.id))
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})






