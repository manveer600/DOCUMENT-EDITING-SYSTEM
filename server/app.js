import express from "express";
import userRoutes from "./routers/userRoutes.js";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
app.use(
    cors({
        origin: 'https://client-n8wzrsa6w-manveer-singhs-projects.vercel.app',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);
export default app;