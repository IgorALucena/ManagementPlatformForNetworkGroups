import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errors } from "celebrate";

import routes from "./routes";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import {
  validationErrorHandler,
  globalErrorHandler,
} from "./middlewares/validation.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

app.use("/api/v1", routes);

app.use(validationErrorHandler);
app.use(globalErrorHandler);

export default app;
