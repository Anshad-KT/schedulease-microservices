import mongoose from "mongoose";
import {
  UserCreatedListener
} from "../events/listeners/user-created-listener";

import { natsWrapper } from "../nats-wrapper";


const connectNats = async () => {
   setTimeout(async ()=>{
    try {
   
      await natsWrapper.connect("scheduleease", "1234567sasaw", "http://nats1-srv:4222");
  
      natsWrapper.client.on("close", () => {
        console.log("NATS connetion closed!");
        process.exit();
      });
      console.log("but y");
      
      process.on("SIGINT", () => natsWrapper.client.close());
      process.on("SIGTERM", () => natsWrapper.client.close());
  
      new UserCreatedListener(natsWrapper.client).listen();
     
    } catch (error: any) {
      console.log(error.message);
    }
   },10000)
};

export { connectNats };
