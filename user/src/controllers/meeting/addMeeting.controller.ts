import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { addMeeting_UseCase },
  } = dependencies;

  const addMeeting = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const addedMeeting = await addMeeting_UseCase(dependencies).execute(req.body);

      if (!addedMeeting){
        res.json({msg:"error"})
        throw new BadRequestError("Something Went Wrong");
       
      }else{
  
        res.json({addedMeeting});
      } 

      
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return addMeeting;
};
