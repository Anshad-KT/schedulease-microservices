import e, { Request, Response, NextFunction } from "express";
import { DepenteniciesData } from "../../entities/interfaces";
export = (dependencies: DepenteniciesData): any => {
  const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session = null;
      return  res.json({ status: true, content: "Successfully Logged out" });
    } catch (error: any) {
      return  res.status(500).json({msg:error.message})
    }
  };
  return signOut;
} 