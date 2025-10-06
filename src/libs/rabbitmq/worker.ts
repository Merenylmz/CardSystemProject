import { consumeQueue } from "./configureRMQ";
import workerpool from "workerpool";

const pool = workerpool.pool({maxWorkers: 4});

consumeQueue(async (msg: {type: string, payload?: {}})=>{
    switch (msg.type) {
        case "sendMail":
            if (msg.payload) {
                await pool.exec(sendMailFunction, [msg.payload]);
            } else {
                return console.log("If Your wanna send email, please enter payload information.");
            }
            break;
        default:
            console.log("Please Check your Rabbit consume name");
            break;
    }
});

function sendMailFunction({}) {
    
}