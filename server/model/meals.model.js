const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

mealSchema.virtual("orders", {
    ref: 'Order',
    localField: '_id',
    foreignField: 'meal'
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;