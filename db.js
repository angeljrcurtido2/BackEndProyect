import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const MongoDB = "mongodb+srv://angeleliascurtido091:QQmMvJmG3D0MGi5a@cluster0.f1izbt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
