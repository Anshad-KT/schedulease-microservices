import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { getAllMeetingHost_UseCase },
  } = dependencies;

  const getAllMeetingHost = async (req: any, res: Response, next: NextFunction) => {
    try {
console.log(JSON.parse(req.headers['accesstoken']).email,"reqhearrrrrrrrr");

      const meetDocuments = await getAllMeetingHost_UseCase(dependencies).execute(JSON.parse(req.headers['accesstoken'])!.email);
console.log(meetDocuments);

      if (!meetDocuments){
        res.json({msg:"error"})
        throw new BadRequestError("Something Went Wrong");
       
      }else{
  
        res.json(meetDocuments);
      } 

      
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return getAllMeetingHost;
};
