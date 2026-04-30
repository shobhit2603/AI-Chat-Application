import dotenv from "dotenv";

dotenv.config();

if (
    !process.env.PORT ||
    !process.env.MONGO_URI ||
    !process.env.JWT_SECRET ||
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_CALLBACK_URL ||
    !process.env.MISTRAL_API_KEY ||
    !process.env.FRONTEND_URL
) {
    console.error(
        "Missing required environment variables. Please check your .env file.",
    );
    process.exit(1);
}

const config = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;