import mongoose from 'mongoose';
import { User } from '../../components/UI/DataTableComponent';
import { CollectionName } from './collectionName';

type UserWOId = Omit<User, '_id'>;
export interface IUser extends UserWOId, Document {}

// OUR TODO SCHEMA
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username required.']
  },
  role: {
    type: String,
    enum: ['Admin', 'Super Agent', 'Agent'],
    required: [true, 'User role required.']
  },
  fbLink: {
    type: String,
    required: [true, 'Facebook id link required.']
  },
  fbName: {
    type: String,
    required: [true, 'Facebook id name required.']
  },
  whatsappLink: String,
  whatsappNumber: String,
  complainToUserIdLink: {
    type: String,
    required: [true, 'Complain to user id link required.']
  },
  complainToUserName: {
    type: String,
    required: [true, 'Complain to username required.']
  }
});

// OUR TODO MODEL
const User =
  mongoose.models.User ||
  mongoose.model<IUser>(CollectionName.USER, userSchema);

export default User;
