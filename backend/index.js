import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoutes from "./Routes/doctors.js";
import reviewRoutes from "./Routes/reviews.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ✅ Ensure CORS is properly configured
const corsOptions = {
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Correct HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Apply middleware **before** defining routes
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ✅ Define a test route to check if API is reachable
app.get("/", (req, res) => {
    res.send("API is working");
});

// ✅ Define routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// ✅ MongoDB connection
mongoose.set("strictQuery", false);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB is connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
};

// ✅ Start server after database connects
app.listen(port, async () => {
    await connectDb();
    console.log(`Server is running on port ${port}`);
});
