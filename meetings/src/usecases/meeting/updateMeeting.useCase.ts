
import { Meeting, MeetingInstance } from "../../entities/meeting"
import { DepenteniciesData } from "../../entities/interfaces";

export const updateMeeting_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { meetingRepository },
  } = dependencies;

  if (!meetingRepository)
    throw new Error("The user repository should be dependencie");


    const execute = ({dateOptions,id,userId ,timeOptions}: {dateOptions:string,id:string,userId:string,timeOptions:string}) => {
    
    return meetingRepository.confirmMeeting({dateOptions,id,userId ,timeOptions});
  };
  return {
    execute,
  };
};
