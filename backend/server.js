import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDB } from "./src/config/database.js";

const PORT = config.PORT || 5000;

try {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
}