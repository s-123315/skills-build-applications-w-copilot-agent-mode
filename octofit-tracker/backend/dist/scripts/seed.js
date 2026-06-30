"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, models_1.connectToDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        {
            name: 'Ava Chen',
            email: 'ava.chen@example.com',
            age: 29,
            fitnessGoal: 'Marathon training',
        },
        {
            name: 'Noah Patel',
            email: 'noah.patel@example.com',
            age: 34,
            fitnessGoal: 'Strength and endurance',
        },
        {
            name: 'Mina Alvarez',
            email: 'mina.alvarez@example.com',
            age: 27,
            fitnessGoal: 'Flexibility and recovery',
        },
    ]);
    await models_1.Team.insertMany([
        {
            name: 'Trail Blazers',
            sport: 'Running',
            members: users.slice(0, 2).map((user) => user.name),
            captain: users[0].name,
        },
        {
            name: 'Core Crushers',
            sport: 'CrossFit',
            members: [users[2].name],
            captain: users[2].name,
        },
    ]);
    await models_1.Activity.insertMany([
        {
            type: 'run',
            duration: 35,
            distanceKm: 6.2,
            userId: users[0]._id.toString(),
            notes: 'Morning tempo run',
        },
        {
            type: 'strength',
            duration: 45,
            distanceKm: 0,
            userId: users[1]._id.toString(),
            notes: 'Upper body and core',
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        {
            userId: users[0]._id.toString(),
            score: 1420,
            rank: 1,
        },
        {
            userId: users[1]._id.toString(),
            score: 1385,
            rank: 2,
        },
        {
            userId: users[2]._id.toString(),
            score: 1310,
            rank: 3,
        },
    ]);
    await models_1.Workout.insertMany([
        {
            name: 'Morning HIIT',
            difficulty: 'medium',
            duration: 25,
            focus: 'Cardio',
        },
        {
            name: 'Recovery Flow',
            difficulty: 'easy',
            duration: 20,
            focus: 'Mobility',
        },
    ]);
    console.log('Database seeded successfully');
}
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
