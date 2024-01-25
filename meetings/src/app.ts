import { NotFoundError } from "@intellectx/build";
import cookieSession from "cookie-session";
import express, { json } from "express";
import depentencies from "./config/depentencies";
import { routes } from "./app/routes";
import { Meeting, User } from "./app/database/mongo/models";

const app = express();
  
app.set("trust proxy", true);
app.use(json());
app.use( 
  cookieSession({
    signed: false,
    secure: false, 
  })
);

app.use("/api", routes(depentencies));

app.get("/api/meeting/delete", async (req, res) => {
  await Meeting.deleteMany();
  await User.deleteMany();
  res.json("deleted");
});
   
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// app.use(ErrorHandler);

export { app };
