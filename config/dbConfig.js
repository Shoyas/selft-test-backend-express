import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB is working properly');
});

connection.on('error', (error) => {
    console.log('MongoDB failed to connect:', error);
});

export default connection;
