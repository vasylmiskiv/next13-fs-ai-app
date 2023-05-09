import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("sctrictQuery", true);

  if (isConnected) {
    console.log("MongoDB has been connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      userNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
