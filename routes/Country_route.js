const router = require("express").Router();
const Country = require("../models/Country");

/*******************     Insert New Country     ******************/

router.post("/", async (req, res) => {

    const { id, name } = req.body;

    try {
        // get available countries match to id or name
        countries = await Country.find({ 
            $or: [
                { id: id },
                { name: name }
            ]            
         }).count();

        //check whether the country is already exist in the database
        if (countries > 0) {
            return res.status(409).json({ message: "This id or name is already in use 🛑" });
        }

        const country = new Country({
            id: id,
            name: name
        });

        await country.save();
        return res.status(201).json({ message: "Country successfully added! ✅", country });

    } catch (error) {
        return res.status(500).json({ message: "Server error while adding country. Please try again latter" });
    }
});

/***********************************************************************************/


/***********************     Display all Countries     ***********************/

router.get('/', async (req, res) => {
    try {

        const countries = await Country.find();

        if (countries.length < 1) {
            return res.status(404).json({ message: "No Country found yet!" });
        }

        return res.status(200).json({ message: `${countries.length} countries Found`, countries });

    } catch (error) {
        return res.status(500).json({ message: "Server error while getting country data" });
    }
});

/**************************************************************************************/


module.exports = router;