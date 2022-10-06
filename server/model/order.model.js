const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

const orderSchema = new Schema({
    user: {
        type: userSchema,
        required: true
    },
    meals: [{
        mealId: {
            type: Schema.Types.ObjectId,
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }]
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;