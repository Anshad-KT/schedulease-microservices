import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { getAllMeetingHost_UseCase },
  } = dependencies;

  const getAllMeetingHost = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const meetDocuments = await getAllMeetingHost_UseCase(dependencies).execute(req.headers['accesstoken']);

      if (!meetDocuments){
        return   res.json({msg:"error"})

       
      }else{
  
        return   res.json({meetDocuments});
      } 

      
    } catch (error: any) {
      return   res.status(500).json({msg:error.message})
    }
  };
  return getAllMeetingHost;
};
