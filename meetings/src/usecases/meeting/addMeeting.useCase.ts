
import { Meeting, MeetingInstance } from "../../entities/meeting"
import { DepenteniciesData } from "../../entities/interfaces";

export const addMeeting_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { meetingRepository },
  } = dependencies;

  if (!meetingRepository)
    throw new Error("The user repository should be dependencie");


    const execute = ({ title,host,dateOptions,duration,guests, isCompleted,timeOptions}: Meeting) => {
    const user = new MeetingInstance({ title,host,dateOptions,duration,guests, isCompleted,timeOptions});
    return meetingRepository.addMeeting(user);
  };
  return {
    execute,
  };
};
