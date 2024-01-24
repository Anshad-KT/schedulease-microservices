import express from "express";
import meetingRoutes from "./meeting/meeting";



export const routes = (dependencies: any) => {
  const routes = express.Router();

  const meeting = meetingRoutes(dependencies);
  routes.use("/meeting", meeting);
  
  return routes;
};
