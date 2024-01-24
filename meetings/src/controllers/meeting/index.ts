import addMeetingController from "./addMeeting.controller"
import getAllMeetingGuestController from "./getAllMeetingGuest.controller";
import getAllMeetingHostController from "./getAllMeetingHost.controller";
import getMeetingGuestController from "./getMeetingGuest.controller";
import getMeetingHostController from "./getMeetingHost.controller"
import updateMeetingController from "./updateMeeting.controller"

export = (dependencies: any) => {
  return {
    addMeetingController: addMeetingController(dependencies),
    getAllMeetingGuestController: getAllMeetingGuestController(dependencies),
    getAllMeetingHostController: getAllMeetingHostController(dependencies),
    getMeetingGuestController: getMeetingGuestController(dependencies),
    getMeetingHostController: getMeetingHostController(dependencies),
    updateMeetingController: updateMeetingController(dependencies)
  };
};
