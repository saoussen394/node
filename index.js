const express = require("express");
const cors = require("cors"); 

const app = express();

// create express app
app.use(cors());
app.use(express.json());
// setup the server port
const port = process.env.PORT || 5000;

// define root route
app.get("/", (req, res) => {
    res.send("Hello World");  
});

// listen to the port
app.listen(port, () => {
    console.log(`Express is running at port ${port}`);
});

const loginRoutes = require("./routes/login.router")

// import task routes
const taskRoutes = require("./routes/task.route");
// create task routes
app.use("/api/v1/task", taskRoutes);


// import employee routes
const employeeRoutes = require("./routes/employee.route");
// create employee routes
app.use("/api/v1/employee", employeeRoutes);


// import note routes
const noteRoutes = require("./routes/note.route");
// create note routes
app.use("/api/v1/note", noteRoutes);

//authenticate
app.use("/api/v1/auth", loginRoutes);

// import announcement routes
const announcementRoutes = require("./routes/announcement.route");
// create announcement routes
app.use("/api/v1/announcement", announcementRoutes);

// import history routes
const historyRoutes = require("./routes/history.route");
// create history routes
app.use("/api/v1/history", historyRoutes);

// import idea routes
const ideaRoutes = require("./routes/idea.route");
// create idea routes
app.use("/api/v1/idea", ideaRoutes);

// import Todo routes
const TodoRoutes = require("./routes/Todo.routes");
// create todo routes
app.use("/api/v1/todo", TodoRoutes);


// import archive routes
const archiveRoutes = require("./routes/archive.route");
// create archive routes
app.use("/api/v1/archive_task", archiveRoutes);

// import archive routes
const archiveEMPRoutes = require("./routes/archiveEMP.route");
// create archive routes
app.use("/api/v1/archiveEMP", archiveEMPRoutes);