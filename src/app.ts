import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import printPretty from "digistar-hacker-faisal";

import mainRoutes from "./routes/main.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import errorHandlingMiddleware from "./core/middlewares/error-handling.middleware";
import requestLoggingMiddleware from "./core/middlewares/request-logging.middleware";
import { PORT, HOST, MONGODB_URL } from "./core/config/env";

const app = express();

app.use(bodyParser.json());

app.use(requestLoggingMiddleware);

app.use(mainRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.use(errorHandlingMiddleware);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, HOST, () => {
      printPretty("debug", `Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
