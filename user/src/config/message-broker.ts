
import { natsWrapper } from "../nats-wrapper";
import { MeetingCreatedListener } from "../events/listeners/meeting-created-listener";

const connectNats = async () => {
   setTimeout(async ()=>{
    try {
   
      await natsWrapper.connect("scheduleease", "123456", "http://nats1-srv:4222");
  
      natsWrapper.client.on("close", () => {
        console.log("NATS connetion closed!");
        process.exit();
      });
      console.log("but y");
      
      process.on("SIGINT", () => natsWrapper.client.close());
      process.on("SIGTERM", () => natsWrapper.client.close());
  
      new MeetingCreatedListener(natsWrapper.client).listen();
  
     
    } catch (error: any) {
      console.log(error.message);
    }
   },10000)
};

export { connectNats };
