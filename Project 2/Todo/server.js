import express from "express"
import connectDb from "./connectDb.js";
import taskRouter from "./routes/taskRoutes.js";
const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

connectDb();


app.use("/", taskRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});