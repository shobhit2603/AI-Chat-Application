import { Router } from 'express';
import passport from 'passport';
import { googleAuthCallback, getCurrentUser, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = Router();


authRouter.get("/google",
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email']
    })
);

authRouter.get("/google/callback", passport.authenticate('google',
    {
        session: false,
        failureRedirect: '/'
    }),
    googleAuthCallback
);

authRouter.get("/me", authMiddleware, getCurrentUser);

authRouter.post("/logout", authMiddleware, logout);


export default authRouter;