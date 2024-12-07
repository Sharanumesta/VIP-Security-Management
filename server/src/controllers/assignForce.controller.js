import Location from "../models/location.model.js";
import Soldier from "../models/soldiers.model.js";

const assignSoldiers = async (req, res) => {
  try {
    const { location, numSoldiers } = req.body;

    // Validate inputs
    if (!location || numSoldiers <= 0) {
      return res.status(400).json({ message: "Invalid input." });
    }

    // Fetch the location
    const getLocation = await Location.findOne(location);
    if (!getLocation) {
      return res.status(404).json({ message: "Location not found." });
    }

    // Find active soldiers
    const assignedSoldiers = await Soldier.find({ status: "active" }).limit(
      numSoldiers
    );

    if (assignedSoldiers.length === 0) {
      return res
        .status(400)
        .json({ message: "No active soldiers available for assignment." });
    }

    const soldierIds = assignedSoldiers.map((soldier) => soldier._id);
    // Use updateMany to assign the location to only the assigned soldiers
    const result = await Soldier.updateMany(
      { _id: { $in: soldierIds } },
      { $set: { location: getLocation._id, status: "assigned" } }
    );

    const populate = await Soldier.find({ _id: { $in: soldierIds } }).populate(
      "location",
      "name latitude longitude"
    );

    const response = populate.map((soldier) => ({
      _id: soldier._id,
      name: soldier.name,
      rank: soldier.rank,
      status: soldier.status,
      location: soldier.location,
    }));

    // Return the response
    res.status(200).json({
      message: "Soldiers assigned successfully.",
      // soldiers: assignedSoldiers,
      soldiers: response,
    });
  } catch (error) {
    console.error("Error during soldier assignment:", error);
    res
      .status(500)
      .json({ message: `Error while assigning soldiers: ${error.message}` });
  }
};

export default assignSoldiers;