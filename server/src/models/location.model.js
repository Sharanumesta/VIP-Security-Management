import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
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
  //   soldiers: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Soldier'
  // }]
  },{
    versionKey:false
  });
  

const Location = mongoose.model('Location', locationSchema);

export default Location;