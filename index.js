import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import provinceRouter from "./controllers/provinceController.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/province", provinceRouter);

app.get("/", (req, res) => res.status(StatusCodes.OK).send("API running"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

