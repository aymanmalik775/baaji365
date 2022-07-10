import mongoose, { Model } from 'mongoose';

// connection function
export const connectToDB = async () => {
  await mongoose
    .connect(process.env.NEXT_PUBLIC_MONGODB_URI as string)
    .catch(err => console.log(err));
  console.log('Mongoose Connection Established');

  return connectToDB;
};
