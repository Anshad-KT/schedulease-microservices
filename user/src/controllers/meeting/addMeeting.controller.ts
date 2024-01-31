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
        return  res.json({msg:"error"})
       
       
      }else{
  
        return   res.json({addedMeeting});
      } 

      
    } catch (error: any) {
      return   res.status(500).json({msg:error.message})
    }
  };
  return addMeeting;
};
