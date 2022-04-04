const mongoose = require("mongoose");


const memberSchema = mongoose.Schema({

    id: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true        
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    registerDate:  {
        type: Date,
        default: Date.now()        
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Member', memberSchema);