import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
        // You can set a cookie here with the user info or a JWT
        // res.cookie('token', yourJwtToken, { httpOnly: true });
        res.redirect("/"); // Redirect to the frontend after successful authentication
        res.json({
            message: "Google Authentication successful",
            user: req.user,
        })
    }
);

export default authRouter;

