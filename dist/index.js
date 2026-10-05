"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// Serve frontend client like Postman at http://localhost:3000/client
exports.app.use('/client', express_1.default.static(path_1.default.join(__dirname, '../public')));
exports.app.get('/client', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
exports.app.get('/', (req, res) => {
    res.send('Hello, World!');
});
exports.app.use("/api", UserRoutes_1.default);
// Only connect and listen when run directly, not when imported by tests
if (require.main === module) {
    const MONGO_URI = process.env.MONGO_URI;
    const PORT = process.env.PORT || 3000;
    if (!MONGO_URI) {
        console.error("Error: MONGO_URI is not set in .env file or environment variable");
        process.exit(1);
    }
    mongoose_1.default.connect(MONGO_URI)
        .then(() => {
        console.log("Connected to MongoDB");
        exports.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
}
