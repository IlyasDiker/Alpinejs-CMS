const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Create and Save a new Entity
exports.create = async (req, res) => {
    let body = req.body;
    if (body.email && body.name) {
        try {
            let x = await prisma.user.create({
                data: {
                    ...body
                }
            })
            res.send({ data: x })
        } catch (error) {
            res.send({ error: error.error })
        }
    } else {
        res.send({ error: "Incomplete data" })
    }
};

// Retrieve and return all Entitys from the database.
exports.findAll = async (req, res) => {
    try {
        let x = await prisma.user.findMany({})
        res.send({ data: x })
    } catch (error) {
        res.send({ error: error.meta })
    }
};

// Find a single Entity with a EntityId
exports.findOne = async (req, res) => {
    if (req.params.id) {
        try {
            let x = await prisma.user.findOne({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            res.send({ data: x })
        } catch (error) {
            res.send({ error: error.meta })
        }
    } else {
        res.send({ error: "incomplete data" })
    }
};

// Update a Entity identified by the EntityId in the request
exports.update = async (req, res) => {
    let body = req.body
    if (body && req.params.id) {
        try {
            let x = await prisma.user.update({
                where: {
                    id: parseInt(req.params.id)
                },
                data: {
                    ...body
                }
            })
            res.send({ data: x })
        } catch (error) {
            res.send({ error: { ...error.meta, ...error.meta } })
        }
    } else {
        console.log(object);
    }
};

// Delete a Entity with the specified EntityId in the request
exports.delete = async (req, res) => {
    if (req.params.id) {
        try {
            let x = await prisma.user.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            res.send({ data: x });
        } catch (error) {
            res.send({ error: error.meta })
        }
    } else {
        res.send({ error: 'No id found' })
    }
};

// Get Schema
exports.schema = async (req, res) => {
    res.send(
        {data: {
            fields: [
                {
                    id: 'email',
                    type: 'email',
                    name: 'Email',
                    placeholder: 'Insert your email',
                    required: true,
                    class: ''
                },
                {
                    id: 'name',
                    type: 'text',
                    name: 'Name',
                    placeholder: 'Insert your name',
                    class: '',
                },
            ],
            list: [
                {
                    label: 'ID',
                    id: 'id'
                },
                {
                    label: 'Email',
                    id: 'email'
                },
                {
                    label: 'Name',
                    id: 'name'
                }
            ],
        }
        }
    )
};