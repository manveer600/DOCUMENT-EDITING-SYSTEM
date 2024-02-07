import { Server } from "socket.io";
import { getDocument, updateDocument } from "./controllers/document.controller.js";
import dotenv from 'dotenv';
import connection from "./database/db.js"; 
import app from './app.js';
dotenv.config();
connection();


const io = new Server(process.env.SOCKET_PORT, {
  cors: {
    origin:'https://client-manveer-singhs-projects.vercel.app/docs/login',
    methods: ["GET", "POST"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  },
});

// CODE FOR SOCKET.IO IN BACKEND
io.on('connection', (socket) => {
    socket.on('get-document', async (documentId) => {
      const document = await getDocument(documentId);
      if(document){
        socket.join(documentId);
        socket.emit('load-document', document.data);
      }
      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit('receive-changes', delta);
    })
      
    socket.on('save-document', async (data) =>{
      await updateDocument(documentId,data);
    } )
  });
});

app.listen(process.env.APP_PORT,()=>{
  console.log(`server is up at ${process.env.APP_PORT}`);
})

