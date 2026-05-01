import * as userDao from '../dao/user.dao.js';
import * as utils from '../utils/utils.js';
import config from '../config/config.js';

export async function googleAuthCallback(req, res) {
    const userData = req.user; // The authenticated user from Passport

    let user = await userDao.findUserByEmail(userData.emails[0].value);

    if (!user) {
        user = await userDao.createUser(
            userData.displayName,
            userData.emails[0].value
        );
    }

    const token = utils.generateJWT({
        id: user._id,
        name: user.name,
    });

    const isProduction = config.FRONTEND_URL?.startsWith("https");

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
    });

    res.redirect(config.FRONTEND_URL ? `${config.FRONTEND_URL}/` : "http://localhost:3000/");
}

export async function getCurrentUser(req, res) {
    res.status(200).json({ user: { id: req.user.id, name: req.user.name } });
}

export async function logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}