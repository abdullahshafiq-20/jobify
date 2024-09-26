// demo-data.js

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('jobify');

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('companies').deleteMany({});
    await db.collection('jobs').deleteMany({});

    // Seed Users
    const users = [
      { username: 'admin', password: await bcrypt.hash('admin123', 10), role: 'admin' },
      { username: 'superadmin', password: await bcrypt.hash('super123', 10), role: 'super-admin' },
    ];
    await db.collection('users').insertMany(users);
    console.log('Users seeded');

    // Seed Companies
    const companies = [
      { name: 'TechCorp', description: 'Leading technology solutions provider', location: 'San Francisco, CA' },
      { name: 'FinanceHub', description: 'Innovative financial services company', location: 'New York, NY' },
      { name: 'GreenEnergy', description: 'Sustainable energy solutions', location: 'Austin, TX' },
      { name: 'HealthTech', description: 'Cutting-edge healthcare technology', location: 'Boston, MA' },
      { name: 'EduLearn', description: 'Online education platform', location: 'Seattle, WA' },
    ];
    const companyResult = await db.collection('companies').insertMany(companies);
    console.log('Companies seeded');

    // Seed Jobs
    const jobs = [
      {
        title: 'Senior Software Engineer',
        description: 'Develop and maintain our core products using cutting-edge technologies.',
        company: companyResult.insertedIds[0],
        location: 'San Francisco, CA',
        salary: 120000,
        requirements: ['5+ years of experience', 'Proficiency in React and Node.js', 'Strong problem-solving skills'],
      },
      {
        title: 'Financial Analyst',
        description: 'Analyze financial data and prepare reports to guide business decisions.',
        company: companyResult.insertedIds[1],
        location: 'New York, NY',
        salary: 90000,
        requirements: ['Bachelor\'s degree in Finance or related field', 'Strong analytical skills', 'Proficiency in Excel'],
      },
      {
        title: 'Renewable Energy Engineer',
        description: 'Design and implement sustainable energy solutions for residential and commercial applications.',
        company: companyResult.insertedIds[2],
        location: 'Austin, TX',
        salary: 95000,
        requirements: ['Degree in Electrical or Environmental Engineering', 'Knowledge of renewable energy technologies', 'Project management experience'],
      },
      {
        title: 'UX/UI Designer',
        description: 'Create intuitive and visually appealing user interfaces for our healthcare applications.',
        company: companyResult.insertedIds[3],
        location: 'Boston, MA',
        salary: 85000,
        requirements: ['3+ years of UX/UI design experience', 'Proficiency in design tools like Figma or Sketch', 'Healthcare industry experience is a plus'],
      },
      {
        title: 'Data Scientist',
        description: 'Analyze educational data to improve our learning algorithms and student outcomes.',
        company: companyResult.insertedIds[4],
        location: 'Seattle, WA',
        salary: 110000,
        requirements: ['Advanced degree in Computer Science, Statistics, or related field', 'Experience with machine learning and data visualization', 'Strong programming skills in Python or R'],
      },
    ];
    await db.collection('jobs').insertMany(jobs);
    console.log('Jobs seeded');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();