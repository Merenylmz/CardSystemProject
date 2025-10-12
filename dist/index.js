"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const configureRedis_1 = require("./libs/redis/configureRedis");
const redis = require("./libs/redis/configureRedis");
const configureRMQ_1 = __importStar(require("./libs/rabbitmq/configureRMQ"));
const Product_routes_1 = __importDefault(require("./routes/Product.routes"));
const Order_routes_1 = __importDefault(require("./routes/Order.routes"));
const User_routes_1 = __importDefault(require("./routes/User.routes"));
const node_cron_1 = __importDefault(require("node-cron"));
const worker_1 = __importDefault(require("./libs/rabbitmq/worker"));
const app = (0, express_1.default)();
dotenv_1.default.config({ quiet: true });
//For a Security
// const limiter = rateLimit({
//     windowMs: 15*60*1000,
//     max: 100,
//     message: "Hey dude, Calm down take it easy :)"
// });
// app.use(cors());
// app.use(limiter);
// app.use(helmet());
//--------------------
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.send({
        systemStatus: true,
        databaseStatus: mongoose_1.default.STATES.connected == 1 ? true : false,
        redisStatus: configureRedis_1.redisStatus,
        rabbitMQStatus: configureRMQ_1.rabbitMQConnectionStatus
    });
});
app.get("/", (req, res) => {
    res.send("Home Endpoint");
});
app.use("/products", Product_routes_1.default);
app.use("/orders", Order_routes_1.default);
app.use("/users", User_routes_1.default);
// app.use();
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Schedule Running...");
    yield (0, worker_1.default)();
}));
app.listen(process.env.PORT || 3002, () => {
    console.log("✅ Listening a PORT");
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MongoDbUri);
        mongoose_1.default.STATES.connected == 1 && console.log("✅ MongoDb Connected");
        yield (0, configureRMQ_1.default)();
        console.log("Ready to Smash :)");
    }))();
});
