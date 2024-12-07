import mongoose from "mongoose";

const soldiersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  location: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Location",
    default: null
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
},{
   versionKey : false
});

const Soldier = mongoose.model("Soldier", soldiersSchema);

export default Soldier;
