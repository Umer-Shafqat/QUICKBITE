
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://umershafqat:UMER123456789@ac-obabctm-shard-00-00.mblmeyi.mongodb.net:27017,ac-obabctm-shard-00-01.mblmeyi.mongodb.net:27017,ac-obabctm-shard-00-02.mblmeyi.mongodb.net:27017/?ssl=true&replicaSet=atlas-6y978h-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};