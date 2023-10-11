let data= [
    {id:1,Service_name:"Kaire",Price:10,Description:"Masinlõikus"},
    {id:2,Service_name:"Maire",Price:20,Description:"Värvimine"},
    {id:1,Service_name:"Juss",Price:25,Description:"Masinlõikus"},
    {id:1,Service_name:"Maiko",Price:50,Description:"Keemilised lokid"}
]

exports.getAll = () => {
    return data.map(g => { return { "id": g.id,"service_name": g.service_name, "price": g.price, "description": g.description } })
}

exports.getById = (id) => {
    return data.find((thing) => thing.id = parseInt(id))
}

exports.create = (newVenue) => {
    const newId = Math.max(...data.map((thing) => thing.id) + 1)
    newVenue.id = newId
    data.push(newVenue)
    return newVenue
}