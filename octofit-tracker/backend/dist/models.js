"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = exports.connectToDatabase = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("./database");
Object.defineProperty(exports, "connectToDatabase", { enumerable: true, get: function () { return database_1.connectToDatabase; } });
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
