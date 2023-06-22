const express = require('express');
const app = express();

const appRouter = express.Router();
const todoModel = require("./appModel");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sandy:sandy1234@sandy.o8vni.mongodb.net/ippo-pay-assesment?retryWrites=true&w=majority');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE, POST, PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const create = async (req, res) =>{
    const { list } = req.body;

    const CreateList = new todoModel({
        _id: new mongoose.Types.ObjectId,
        list,
    })

    try {
        await CreateList.save();
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

    return res.status(200).json({ message: 'List Added Successfully' })
}

const retrive = async (req, res) =>{
    let getLists;
    try {
        getLists =  await todoModel.find({});
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

    return res.status(200).json({ lists: getLists })
}


appRouter.post("/create", create);
appRouter.get("/retrive", retrive);

app.use("/", appRouter);

module.exports = app;