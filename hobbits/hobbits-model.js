const db = require("../data/config")

function find(){
    return db("hobbits")
}

function findById(id){
    return db("hobbits").where({id}).first()
}

async function create(data){
    const [id] = await db("hobbits").insert(data)
    return findById(id)
}

async function update(id, data){
    await db("hobbits").where({id}).update(data)
    return findById(id)
}

async function remove(id){
    await db("hobbits").where({id}).del()
    return find();
}

module.exports = {
    find,
    findById,
    create,
    update,
    remove,
}