import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import rateLimit, {
  RateLimitInfo,
  RateLimitRequestHandler,
} from "express-rate-limit";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app: Application = express();

const coreOptions: Object = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders:
    "Content-Type, Authorization, X-Requested-With, Accept, VERSION , params, headers",
  exposedHeaders:
    "Content-Type, Authorization, X-Requested-With, Accept, VERSION , params, headers",
};

// Middleware
app.use(cors(coreOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter: RateLimitRequestHandler = rateLimit({
  max: 1000000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// static routes
app.use("/Uploads", express.static("./Uploads"));

export default app;
