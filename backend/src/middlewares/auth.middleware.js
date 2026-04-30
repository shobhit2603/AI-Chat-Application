import * as utils from "../utils/utils.js";

export async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = utils.verifyJWT(token);

    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
}