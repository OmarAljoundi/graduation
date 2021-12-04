import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import user_routes from "./handlers/user";
import service_routes from "./handlers/service";
import complaint_routes from "./handlers/complaint";
export const app: express.Application = express();
const address: string = "0.0.0.0:5000";

app.use(bodyParser.json(),cors());
app.get("/", function (req: Request, res: Response) {
  return res.send("Hello World!");
});
service_routes(app)
user_routes(app)
complaint_routes(app)
app.listen(5000, function () {
  console.log(`starting app on: ${address}`);
});
