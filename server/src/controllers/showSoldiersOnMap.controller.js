import Soldier from "../models/soldiers.model.js";

const showSoldiersOnMap = async (req, res) => {
  try {
    const soldier = await Soldier.find({ status: "assigned" }).populate("location", "name latitude longitude");

    return res.status(200).json(soldier);
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Error while shoving the soldier on map ${error.message}`,
      });
  }
};

export default showSoldiersOnMap;
