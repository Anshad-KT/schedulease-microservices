import { NotFoundError} from "@intellectx/build";
import cookieSession from "cookie-session";
import express, { json } from "express";
import depentencies from "./config/depentencies";
import { routes } from "./app/routes";
import { Meeting, User } from "./app/database/mongo/models";
import { errorHandler } from '@geekfindr/common'


const app = express();
 
app.set("trust proxy", true);
app.use(json());
app.use( 
  cookieSession({  
    signed: false,
    secure: false, 
  })
);   
 console.log("why");
 
app.use("/api", routes(depentencies)); 

app.get("/api/user/health", async (req, res) => {
  
  console.log("health check");
 
  return  res.status(200).send('OK');
});
 
app.get("/api/user/delete", async (req, res) => {
  await Meeting.deleteMany();
  await User.deleteMany();

  return  res.json("deleted");
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

 app.use(errorHandler);

export { app };
 