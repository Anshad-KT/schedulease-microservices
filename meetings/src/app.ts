import { NotFoundError } from "@intellectx/build";
import cookieSession from "cookie-session";
import express, { json } from "express";
import depentencies from "./config/depentencies";
import { routes } from "./app/routes";

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

// app.get("/api/user/delete", async (req, res) => {
//   await BankDetails.remove();
//   await EmergencyContact.remove();
//   await Employee.remove();
//   await Notification.remove();
//   await PersonalInfo.remove();
//   await SalaryDetails.remove();

//   res.json("deleted");
// });

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// app.use(ErrorHandler);

export { app };
