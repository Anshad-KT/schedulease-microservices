import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";
import { MeetingRegisteredPublisher } from "../../events/publishers/meeting-created-publisher";
import { natsWrapper } from "../../nats-wrapper";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { addMeeting_UseCase },
  } = dependencies;

  const addMeeting = async (req: Request, res: Response, next: NextFunction) => {
    try {
console.log("req-body",req.body);

      const addedMeeting = await addMeeting_UseCase(dependencies).execute(req.body);

      if (!addedMeeting){
        res.json({msg:"error"})
        throw new BadRequestError("Something Went Wrong");
    
  
      }else{
        await new MeetingRegisteredPublisher(natsWrapper.client).publish({
          id: addedMeeting!.id,
          host: addedMeeting!.host,
          title:addedMeeting!.title,
          duration: addedMeeting!.duration,
          dateOptions: addedMeeting!.dateOptions,
          timeOptions: addedMeeting!.timeOptions,
          version:0,
          guests: addedMeeting!.guests,
          isCompleted:addedMeeting!.isCompleted
        }); 
        res.json({addedMeeting});
      } 

      
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return addMeeting;
};
