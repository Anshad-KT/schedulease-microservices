import express from "express";

import { meetingController } from "../../../controllers/";



export = (dependencies: any) => {
  const router = express.Router();
  const {
addMeetingController,
getAllMeetingGuestController,
getAllMeetingHostController,
getMeetingGuestController,
getMeetingHostController,
updateMeetingController
  } = meetingController(dependencies);

  router.post(
    "/addmeeting",
    addMeetingController,
   
  );
  router.get(
    "/guest/meeting",
    getAllMeetingGuestController
  ); 
  router.get(
    "/guest/meeting/:id",
    getMeetingGuestController
    
  );
  router.get(
    "/host/meeting",
    getAllMeetingHostController,
  );
  router.get(
    "/host/meeting/:id",
    getMeetingHostController
  );
  router.post(
    "/confirm",
    updateMeetingController
  )


  
  return router;
};
