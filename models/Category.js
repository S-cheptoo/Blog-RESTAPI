const mongoose = require("mongoose")

const CategorySchema = new mongoose.schema({
    name:{
        type: String,
        required: true,
    },
    }
);

module.exports = mongoose.model("Category", CategorySchema);
