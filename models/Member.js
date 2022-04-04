const mongoose = require("mongoose");


const memberSchema = mongoose.Schema({

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