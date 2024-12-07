import Location from "../models/location.model.js";

const  getLocation = async (req, res) => {
    try {
        const locations = await Location.find().sort({name:1});
        res.status(200).json(locations);
    } catch (error) {
        console.log("Error while fetching the locations: ", error);
        res.status(4500).json({message : "Error while fetching the locations: "});
    }
}

export default getLocation;