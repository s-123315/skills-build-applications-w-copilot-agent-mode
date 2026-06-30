import { connectToDatabase, User, Team, Activity, LeaderboardEntry, Workout } from '../models';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  await Team.insertMany([
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

  await Activity.insertMany([
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

  await LeaderboardEntry.insertMany([
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

  await Workout.insertMany([
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
