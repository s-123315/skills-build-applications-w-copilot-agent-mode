"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = exports.connectToDatabase = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const connectToDatabase = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default.connection;
    }
    return mongoose_1.default.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
    });
};
exports.connectToDatabase = connectToDatabase;
exports.User = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    fitnessGoal: String,
}, { timestamps: true }));
exports.Team = (0, mongoose_1.model)('Team', new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: String,
    members: [String],
    captain: String,
}, { timestamps: true }));
exports.Activity = (0, mongoose_1.model)('Activity', new mongoose_1.Schema({
    type: { type: String, required: true },
    duration: Number,
    distanceKm: Number,
    userId: String,
    notes: String,
}, { timestamps: true }));
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', new mongoose_1.Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    rank: Number,
}, { timestamps: true }));
exports.Workout = (0, mongoose_1.model)('Workout', new mongoose_1.Schema({
    name: { type: String, required: true },
    difficulty: String,
    duration: Number,
    focus: String,
}, { timestamps: true }));
