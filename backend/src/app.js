import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from './config/config.js';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        },
    ),
);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

export default app;