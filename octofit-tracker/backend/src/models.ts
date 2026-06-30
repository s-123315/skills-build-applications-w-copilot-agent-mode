import { Schema, model } from 'mongoose';
import { connectToDatabase } from './database';

export { connectToDatabase };

export const User = model(
  'User',
  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    fitnessGoal: String,
  }, { timestamps: true })
);

export const Team = model(
  'Team',
  new Schema({
    name: { type: String, required: true },
    sport: String,
    members: [String],
    captain: String,
  }, { timestamps: true })
);

export const Activity = model(
  'Activity',
  new Schema({
    type: { type: String, required: true },
    duration: Number,
    distanceKm: Number,
    userId: String,
    notes: String,
  }, { timestamps: true })
);

export const LeaderboardEntry = model(
  'LeaderboardEntry',
  new Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    rank: Number,
  }, { timestamps: true })
);

export const Workout = model(
  'Workout',
  new Schema({
    name: { type: String, required: true },
    difficulty: String,
    duration: Number,
    focus: String,
  }, { timestamps: true })
);
