const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({

    id: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model("Country", countrySchema);