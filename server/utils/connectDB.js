const mongoose = require("mongoose");

const connectDB = async (URI = "mongodb://localhost:27017/meals") => {
    try {
        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connections[0].host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;