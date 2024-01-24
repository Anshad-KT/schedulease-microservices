
import { userRepository,meetingRepository } from "../app/repository/mongo";
import { DepenteniciesData, repositoryData, useCaseData } from "../entities/interfaces";
import { addMeeting_UseCase,signUp_UseCase,getUser_UseCase,getAllMeetingGuest_UseCase,getAllMeetingHost_UseCase,getMeetingGuest_UseCase,getMeetingHost_UseCase, updateMeeting_UseCase,signIn_UseCase } from "../usecases";


const useCases: useCaseData = {
  updateMeeting_UseCase, addMeeting_UseCase, signUp_UseCase, getUser_UseCase, getAllMeetingGuest_UseCase, getAllMeetingHost_UseCase, getMeetingGuest_UseCase, getMeetingHost_UseCase,signIn_UseCase
  
};
 
const repository: repositoryData = {
  userRepository,
  meetingRepository
}; 

export = {
  useCases,
  repository,
};
 