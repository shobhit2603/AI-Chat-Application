import userModel from "../models/user.model.js";

export async function findUserByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
}

export async function createUser(name, email) {
    const newUser = await userModel.create({ name, email, role: "user" });
    return newUser;
}