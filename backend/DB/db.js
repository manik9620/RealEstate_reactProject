import mongoose from "mongoose";
import colors from "colors";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Successfully Connected to Database".bgGreen.white);
  } catch (error) {
    console.log(error);
    console.log("Error in connecting to database".bgRed.white);
  }
};

export default ConnectDB;
