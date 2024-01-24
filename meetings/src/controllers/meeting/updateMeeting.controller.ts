import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";
import {MeetingUpdatedPublisher } from "../../events/publishers/meeting-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { updateMeeting_UseCase },
  } = dependencies;

  const updateMeeting = async (req: any, res: Response, next: NextFunction) => {
    try {
        const {id,userId,dateOptions,timeOptions} = req.body


      const meetDocuments = await updateMeeting_UseCase(dependencies).execute({id,userId,dateOptions,timeOptions});

 
      if (!meetDocuments){
        res.json({msg:"error"})
        throw new BadRequestError("Something Went Wrong");
       
      }else{
    
        res.json(meetDocuments);
        await new MeetingUpdatedPublisher(natsWrapper.client).publish({
            id: meetDocuments._id,
            userId: meetDocuments.userId,
            dateOptions: meetDocuments.dateOptions,
            timeOptions: meetDocuments.timeOptions
        })
      }
      
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return updateMeeting;
};
