const { Op } = require('sequelize');
const Item = require('../models/item');

const sendResponse = (status, msg, body = {}) => {
    return {
        status: status,
        message: msg,
        body: body,
    }
}

// get all items (without filtering and pagination)
const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.send(sendResponse('0000', 'Get All Items Successfully', items));
    } catch (err) {
        console.log("Failed to get all items: ", err.message);
        res.send(sendResponse('9999', 'Error Get All Items.'));
    }
}

// create the item
const createItem = async (req, res) => {
    try {
        if (!req.body?.todo) {
            res.send(sendResponse('9999', 'Item cannot be empty'));
            return;
        }

        const isItemExist = await Item.findOne({
            where: {todo: req.body.todo},
        })

        if (isItemExist) {
            res.send(sendResponse('9999', 'Item already existed.'));
            return;
        }

        const newItem = {
            todo: req.body.todo,
            isCompleted: req.body?.isCompleted || 0, // default isCompleted is 0
            createdAt: new Date(),
        };
        const createdItem = await Item.create(newItem);
        res.send(sendResponse('0000', 'Create Item Successfully', createdItem));
    } catch (err) {
        console.log("Failed to create item: ", err.message);
        res.send(sendResponse('9999', 'Error Create Item'));
    }
}

// update the item
const updateItem = async (req, res) => {
    try {
        if (!req.body.todo) {
            res.send(sendResponse('9999', 'Item cannot be empty'));
            return;
        }

        const isItemExist = await Item.findOne({
            where: {
                id: {[Op.ne]: req.params.id},
                todo: req.body.todo
            },
        })

        if (isItemExist) {
            res.send(sendResponse('9999', 'Item already existed, cannot change to that name'));
            return;
        }


        Item.findByPk(req.params.id).then((item) => {
            item.update({
                todo: req.body.todo,
                isCompleted: req.body.isCompleted
            }).then((item) => {
                res.send(sendResponse('0000', 'Item update successfully.', item));
            }).catch((err) => {
                res.send(sendResponse('9999', 'Item not found.', err));
            });
        });
    } catch (err) {
        console.log("Failed to update the item: ", err.message);
        res.send(sendResponse('9999', 'Error Update Item.'));
    }
}

// Delete the item
const deleteItem = async (req, res) => {
    try {
        const deletedRows = await Item.destroy({
            where: { id: req.params.id },
        });
        if (deletedRows > 0) {
            res.send(sendResponse('0000', 'Item delete successfully.'))
        } else {
            res.status(404).json(sendResponse('9995', 'Item Not Found.'))
        }
    } catch (err) {
        console.log("Failed to delete item: ", err.message);
        res.send(sendResponse('9999', 'Error Delete Item.'))
    }
}

module.exports = { getAllItems, createItem, updateItem, deleteItem };