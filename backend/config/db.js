import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use environment variable or fallback to local MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    
    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;