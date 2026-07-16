import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    try {

        // Check if image is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            });
        }

        const image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category
        });

        await food.save();

        res.status(200).json({
            success: true,
            message: "Food item added successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error fetching food items"
        });
    }
};

//remove food items

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food item removed successfully"
        })
    }catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error removing food item"
        });
    }
}


export { addFood, listFood ,removeFood };  