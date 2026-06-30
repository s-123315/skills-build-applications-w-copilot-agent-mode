"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const fallbackUsers = [
    { id: '1', name: 'Ava', email: 'ava@example.com' },
    { id: '2', name: 'Noah', email: 'noah@example.com' },
];
const fallbackTeams = [
    { id: '1', name: 'Trail Blazers', members: ['Ava', 'Noah'] },
];
const fallbackActivities = [
    { id: '1', type: 'run', duration: 30, userId: '1' },
];
const fallbackLeaderboard = [
    { id: '1', userId: '1', score: 1200 },
];
const fallbackWorkouts = [
    { id: '1', name: 'Morning HIIT', difficulty: 'medium', duration: 25 },
];
const getCollection = async (model, fallback) => {
    try {
        const documents = await model.find({}).lean();
        return documents.length > 0 ? documents : fallback;
    }
    catch {
        return fallback;
    }
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.get('/api/config', (_req, res) => {
    res.json({ baseUrl, port, codespaceName: codespaceName ?? null });
});
app.get('/api/users/', async (_req, res) => {
    const users = await getCollection(models_1.User, fallbackUsers);
    res.json({ baseUrl, count: users.length, users });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await getCollection(models_1.Team, fallbackTeams);
    res.json({ baseUrl, count: teams.length, teams });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await getCollection(models_1.Activity, fallbackActivities);
    res.json({ baseUrl, count: activities.length, activities });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await getCollection(models_1.LeaderboardEntry, fallbackLeaderboard);
    res.json({ baseUrl, count: leaderboard.length, leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await getCollection(models_1.Workout, fallbackWorkouts);
    res.json({ baseUrl, count: workouts.length, workouts });
});
(0, models_1.connectToDatabase)()
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.warn('MongoDB connection failed, continuing with fallback data:', error.message);
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});
