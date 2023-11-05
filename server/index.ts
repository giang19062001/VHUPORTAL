import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";

//router
import { routerStudent } from "./src/router/student";
import { routerAuth } from "./src/router/auth";
import { routerSubject } from "./src/router/subject";
import { routerTeach } from "./src/router/teach";
import { routerFee } from "./src/router/fee";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    origin: [process.env.ADDRESS_REACT_APP as unknown as string, process.env.ADDRESS_REACT_DESKTOP as unknown as string,process.env.ADDRESS_REACT_MOBILE as unknown as string],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/vhu/student", routerStudent);
app.use("/vhu/auth", routerAuth);
app.use("/vhu/subject", routerSubject);
app.use("/vhu/teach", routerTeach);
app.use("/vhu/fee", routerFee);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app listening on PORT ${port}`));
