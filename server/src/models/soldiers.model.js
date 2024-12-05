import mongoose, { version } from "mongoose";

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
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
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
