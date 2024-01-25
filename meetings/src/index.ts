import { app } from "./app";
import { connectDB } from "./config/db";
import { evnCheckers } from "./config/env-checker";
import { connectNats } from "./config/message-broker";
import { Server as SocketIOServer, Socket } from 'socket.io';
import { intPort } from "./config/port";
import { meetingRepository } from "./app/repository/mongo";
let data :any= null
const start = async () => {
  console.log('786...');

  try {
    evnCheckers();
    connectNats()
    connectDB()
  } catch (err) {
    console.error(err);
  }
  const joinedUsersMap = new Map();
  const httpServer = app.listen(intPort, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });

  const io = new SocketIOServer(httpServer, {
    pingTimeout: 60000,
    cors: {
      origin: ["https://cybrosis.intellectx.com", "https://cybrosis.intellectx.com"],
      methods: ["GET", "POST"]
    }
  });




  io.on('connection', (socket: Socket) => {

console.log("sddsd");

    socket.on('setup', (userId: string) => {
      console.log(userId, "userId");
      socket.join(userId);
      socket.emit('connected');
    });

    socket.on('join chat', (room: string) => {
      // Check if the socket is already in the specified room
      if (!socket.rooms.has(room)) {
        // If not, join the room
        socket.join(room);
        console.log(`User Joined room: ${room}`);
      } else {
        console.log(`User is already in room: ${room}`);
      }
    });


    socket.on('new message', (newMessageReceived: any) => {
      const chatRoomId = newMessageReceived.id;
      console.log('new message', newMessageReceived);

      if (!chatRoomId) {
        return console.log('Chat room ID not defined');
      }


      console.log(chatRoomId);

      socket.to(chatRoomId).emit('message received', newMessageReceived);
    });
    socket.on('request', async ({roomId,userId,host}:any)=>{
      socket.join('room'+roomId)
      if (joinedUsersMap.has(roomId)) {
        const users = joinedUsersMap.get(roomId);
    
        // Check if the user_id is in the array of joined users
        if (users.includes(host)) {
          console.log(users,"lopp");
          
          console.log(`from ${userId} to room ${roomId} emit - pending`);
          socket.emit('pending',{roomId,userId,host}) //to send to host
          
        } else {
          console.log(`from ${userId} to room ${roomId} emit- nohost`);
         io.to('room'+roomId).emit('nohost',{roomId,userId,host}) // if no host, send to the user requested
        }
      } else {
        console.log(`from ${userId} to room ${roomId} emit- nohost`);
        io.to('room'+roomId).emit('nohost',{roomId,userId,host})
        
      }
    })
    socket.on('reqhost', async({roomId,userId}:{roomId:string,userId:string}) => {
      console.log(`from ${userId} to room ${roomId} emit-reqhost`);
      socket.to(roomId).emit('requestuser',{roomId,userId,host:data?.host})
    })
    socket.on('response', async({userId,result,roomId}:{userId:string,result:Boolean,roomId:string})=>{
      console.log(`from ${userId} to room ${roomId} emit-response`);
      socket.to('room'+roomId).emit('hostresponse',{userId,result,roomId})
    }) 
    socket.on("join-video-chat", async ({ roomId, user_id }) => {
      await socket.join(roomId)
      console.log("join-video-chat");
      console.log({ roomId, user_id });
      if(!data){
        let res = await meetingRepository.getMeetingHost(roomId,user_id);
        console.log(res);
        
        data = res
      }
      if (!joinedUsersMap.has(roomId)) {
        // If not, create a new entry with an array containing the user_id
        joinedUsersMap.set(roomId, [user_id]);
        
       
       
      } else {
        // If the room already exists, push the user_id to the existing array
        const users = joinedUsersMap.get(roomId);
        users.push(user_id);
        joinedUsersMap.set(roomId, users);
       
      //  socket.leave(roomroomId)
      }
      console.log(data?.host,"////",user_id);
      
      if(data?.host === user_id){
        console.log(`host joined to ${roomId}`);
        io.to('room'+roomId).emit("hostjoined", {user_id} )
      }
      socket.to(roomId).emit("newUser", user_id)
    })

    socket.on("sendMessageToPeer", (data) => {
      if (data.type == "offer" || data.type == "answer") {
        console.log(`from ${data.user_id} to ${data.remoteUser_id} type: ${data.type} `);

      }
      socket.to(data.roomId).emit("receivedPeerToPeer", data)
    })

    socket.on("call-end", ({ remoteUser_id, roomId }) => {
      console.log({ remoteUser_id, roomId });

      socket.to(roomId).emit("call-end", { remoteUser_id, roomId })
      socket.leave(roomId)
    })


  });
}; 
 
start();
