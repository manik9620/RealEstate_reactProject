import Express from "express";
import dotenv from "dotenv";
import ConnectDB from "./DB/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import listingRoutes from "./routes/listingRoute.js";
import bookingRoutes from "./routes/bookingRoute.js";
import userRoutes from "./routes/userRoute.js"

const app = Express();
dotenv.config();
app.use(cors());
app.use(Express.json());
app.use(Express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>Rent Your House</h1>");
});

app.use(Express.json());
ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/properties", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
