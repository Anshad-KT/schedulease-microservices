import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { getAllMeetingGuest_UseCase },
  } = dependencies;
interface headertp{
  email:string
}
  const getAllMeetingGuest = async (req: any, res: Response, next: NextFunction) => {
    try {
console.log(req.headers['accesstoken']?.email as headertp);

      const meetDocuments = await getAllMeetingGuest_UseCase(dependencies).execute(JSON.parse(req.headers['accesstoken'])?.email as headertp);
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
  return getAllMeetingGuest;
};
