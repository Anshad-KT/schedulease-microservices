import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { getMeetingGuest_UseCase },
  } = dependencies;

  const getMeetingGuest = async (req: any, res: Response, next: NextFunction) => {
    try {

      const meetDocuments = await getMeetingGuest_UseCase(dependencies).execute(req.params.id,req.headers['accesstoken'] ? JSON.parse(req.headers['accesstoken'])!.email : "");
console.log("ytrw",meetDocuments);
 
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
  return getMeetingGuest;
};
