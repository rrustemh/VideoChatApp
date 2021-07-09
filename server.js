// nodejs modules
const path = require("path");

//package requires
const express = require("express");
const app = express();
const server = require("http").Server(app);
//local requires
const userRouter = require("./routes/user");
const PORT = process.env.PORT || 3000;
const UID = require("uuid").v4;

//root path i faqes

// konfigurime te aplikactionit

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));

app.use(userRouter);
server.listen(PORT, () => {
  console.log(`Server started listening  port ${PORT}`);
});

//chati
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("new user");
  socket.emit("chat-message", "Hello world");
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", message);
  });

  socket.on("send-write", (message) => {
    socket.broadcast.emit("send-write", message);
  });
});
let uids = [];

io.of("/video").on("connection", (socket) => {
  const uid = UID();

  uids.push(uid);
  socket.emit(
    "hello",
    uids.filter((u) => u !== uid)
  );

  console.log("new video user", uid);

  socket.broadcast.emit("new-user", uid);

  socket.on("hi", (name) => {
    socket.broadcast.emit("hi", { uid: uid, letter: name.slice(0, 1) });
  });

  socket.on("image-upload", (message) => {
    socket.broadcast.emit("video", {
      uid: uid,
      img: message,
    });
  });
  socket.on("disconnect", (message) => {
    uids = uids.filter((u) => u !== uid);
    console.log(message);
    console.log(uid);

    socket.broadcast.emit("client-disconnect", uid);
  });

  socket.on("audio-upload", (message) => {
    console.log("audio-upload");

    console.log(message);

    socket.broadcast.emit("audio", message);
  });

  socket.on("no-video-upload", (message) => {
    const letter = message.slice(0, 1);
    console.log(letter);

    socket.broadcast.emit("no-video-upload", {
      uid: uid,
      letter: letter,
    });
  });
});

setTimeout(() => {
  uids = [];
}, 60000);
