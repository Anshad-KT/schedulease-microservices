// import { Subject } from "@intellectx/build";
import { Message } from "node-nats-streaming";
import dependencies from "../../config/depentencies";
import { Listener } from "../../app/externalservice/base-listener";
import { addMeeting_UseCase } from "../../usecases";

export declare enum Subject {
  MeetingCreated = "meeting:created"
}

export interface MeetingCreatedEvent {
  subject: Subject.MeetingCreated;
  data: {
    id:string
    host: string;
  title: string;
  duration: string;
  dateOptions: [string];
  timeOptions: [string];
  guests: [{
    email: string;
    isConfirmed: boolean;
  }];
  isCompleted:boolean
  version: number
  };
}

export class MeetingCreatedListener extends Listener<MeetingCreatedEvent>{
 
  async onMessage(data: MeetingCreatedEvent["data"], msg: Message) {
    const { id, dateOptions,duration,guests,host,isCompleted,timeOptions,title,version } = data;
    try { 
  console.log(`data recieved ${JSON.stringify(data)}`);
  
    
      const result = await addMeeting_UseCase(dependencies).execute(data)
      console.log(result);
      
      msg.ack();
      console.log("acked ");
    } catch (error) {
      console.log(error); 
    } 

  } 
  subject: any = "meeting:created"
  queueGroup: string = 'meeting-user-service';
}
 