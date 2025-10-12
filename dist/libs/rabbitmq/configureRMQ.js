"use strict";
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
exports.consumeQueue = exports.sendToQueue = exports.rabbitMQConnectionStatus = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
let channel;
exports.rabbitMQConnectionStatus = false;
const connectionRabbit = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect(process.env.RMQUri || "amqp://guest:guest@localhost:5672");
    channel = (yield connection.createChannel());
    (yield channel).assertQueue("taskQueue");
    exports.rabbitMQConnectionStatus = true;
    console.log("✅ RabbitMQ Connected");
});
const sendToQueue = (data) => {
    if (!channel) {
        return false;
    }
    channel.sendToQueue("taskQueue", Buffer.from(JSON.stringify(data)));
};
exports.sendToQueue = sendToQueue;
const consumeQueue = (callback) => {
    if (!channel) {
        return false;
    }
    channel.consume("taskQueue", (msg) => {
        if (msg) {
            const content = JSON.parse(msg.content.toString());
            callback(content);
            channel.ack(msg);
        }
    });
};
exports.consumeQueue = consumeQueue;
exports.default = connectionRabbit;
