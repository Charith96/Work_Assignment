const router = require("express").Router();
const Member = require("../models/Member");

/*******************     Insert New Member     ******************/

router.post("/", async (req, res) => {

    const { name, address, country, registerDate } = req.body;

    let members;
    try {

        members = await Member.find({ 
            $and: [
                {name: name},
                {address: address},
                {country: country}
            ]
         }).count();

        //check whether member is already exist
        if (members > 0) {
            return res.status(400).json({ message: "This member is already in the database 🛑" });
        }

        const member = new Member({
            name: name,
            address: address,
            country: country,
            registerDate: registerDate
        });

        await member.save();
        return res.status(201).json({ message: "Member successfully added! ✅", member });

    } catch (error) {
        return res.status(500).json({ message: "Server error while adding member. Please try again latter" });
    }
});

/***********************************************************************************/


/***********************     Display all Members     ***********************/

router.get('/', async (req, res) => {
    try {

        const members = await Member.find();

        if (members.length < 1) {
            return res.status(404).json({ message: "No Member found yet!" });
        }

        return res.status(200).json({ message: `${members.length} members Found`, members });

    } catch (error) {
        return res.status(500).json({ message: "Server error while getting member data" });
    }
});

/**************************************************************************************/


/*******************     Update Member by id    ******************/

router.put('/:id', async (req, res) => {

    const { name, address, country, registerDate } = req.body;

    try {
        //get ObjectId
        const member_id = req.params.id;

        //check whether member is exist
        var memberExist = await Member.findOne({ member_id });
        if(!memberExist) {
            return res.status(404).json({ message: "No Member found this Id"});
        }

        const member = await Member.findByIdAndUpdate( member_id );
        member.name = name;
        member.address = address;
        member.country = country;
        member.registerDate = registerDate;


        console.log(member);
        await member.save();
        return res.status(201).json({ message: "Member  Successfully updated ✅", member});
        
    } catch (error) {
        return res.status(500).json({ message: "Server error while updating member details"});
    }

});


/********************************************************************************/


/***********************     Delete Member by id     ***********************/

router.delete('/:id', async (req, res) => {

    const member_id = req.params.id;

    try {
        
        var memberExist = await Member.findById( member_id );
        if(!memberExist) {
            return res.status(404).json({ message: "No Member found this Id"});
        }

        await Member.findByIdAndDelete( member_id );
        return res.status(200).json({ message: "Member Successfully Deleted " });

    } catch (error) {
        return res.status(500).json({ message: "Server error while deleting member, try again latter"});
    }
});

/********************************************************************************/


/***********************     Display Member by id     ***********************/

router.get('/:id', async (req, res) => {

    const member_id = req.params.id;

    try {
        const member = await Member.findById( member_id );

        if (member.length == 0) {
            return res.status(404).json({ message: "No Member found!" });
        }

        return res.status(200).json({ message: "members Found", member });

    } catch (error) {
        return res.status(500).json({ message: "Server error while getting member data" });
    }
});

/********************************************************************************/

module.exports = router;