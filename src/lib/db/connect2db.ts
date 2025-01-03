import mongoose from "mongoose";

const connect2db = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    const connectionWithMongoose = await mongoose.connect(
      process.env.DATABASE_CONNECTION_STRING!,
      {
        dbName: "zuse",
      }
    );

    return connectionWithMongoose;
  } catch (error) {
    console.log(console.log(error));
    throw error;
  }
};

export default connect2db;
