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
Object.defineProperty(exports, "__esModule", { value: true });
// import { sendMail } from "../nodemailer/configureNodeMailer";
const threadRunner_1 = require("../threads/threadRunner");
const configureRMQ_1 = require("./configureRMQ");
// const pool = workerpool.pool({maxWorkers: 4});
const processQueueOnce = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!configureRMQ_1.rabbitMQConnectionStatus) {
        return console.log("Please Check Connection(Rabbit)");
    }
    (0, configureRMQ_1.consumeQueue)((msg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(msg);
        switch (msg.type) {
            case "sendMail":
                if (msg.payload) {
                    // await sendMail(msg.payload);
                    yield (0, threadRunner_1.runMailThread)(msg.payload);
                }
                else {
                    return console.log("If Your wanna send email, please enter payload information.");
                }
                break;
            default:
                console.log("Please Check your Rabbit consume name");
                break;
        }
    }));
});
exports.default = processQueueOnce;
