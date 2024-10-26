import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import inventoryRoutes from "./routes/inventoryRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/products", inventoryRoutes);
app.use("/api/order", orderRoutes);

export default app;
