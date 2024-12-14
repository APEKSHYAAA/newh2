import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js"; // Import the user routes
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(express.json());

// Define your routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);  // Add the user route

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/FE/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server Started at http://localhost:' + PORT);
});