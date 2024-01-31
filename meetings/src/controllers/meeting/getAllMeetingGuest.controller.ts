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
  const getAllMeetingGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
console.log(req.headers['accesstoken']?.email as headertp);

      const meetDocuments = await getAllMeetingGuest_UseCase(dependencies).execute(JSON.parse(req.headers['accesstoken'])?.email as headertp);
console.log(meetDocuments);

      if (!meetDocuments){
        return  res.json({msg:"error"})
        
       
      }
  
         res.json(meetDocuments);
      

       
    } catch (error: any) {
      return res.status(500).json({msg:error.message})
    }
  };
  return getAllMeetingGuest;
};
