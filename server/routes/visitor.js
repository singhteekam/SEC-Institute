const express = require("express");

const router = express.Router();

router.get("/getvisitors", async()=>{
    try {
        const Visitor = require("../models/Visitor");
        const visitorData = await Visitor.findOne();
        
        if (!visitorData) {
        return res.status(404).json({ message: "Visitor data not found" });
        }
        
        res.status(200).json(visitorData);
    } catch (error) {
        console.error("Error fetching visitor data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/increment", async (req, res) => {
    try {
        const Visitor = require("../models/Visitor");
        let visitorData = await Visitor.findOne();

        if (!visitorData) {
            visitorData = new Visitor({ visitors: 0 });
        }

        visitorData.visitors += 1;
        await visitorData.save();

        res.status(200).json(visitorData);
    } catch (error) {
        console.error("Error incrementing visitor count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;