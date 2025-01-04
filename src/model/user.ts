import { Schema, model, models, Model } from "mongoose";

// Define the User interface
interface IUser {
  email: string[];
  name?: string; // Optional property
  uid_clerk: string;
}

// Define the schema
const userSchema = new Schema<IUser>({
  email: {
    type: [String],
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  uid_clerk: {
    type: String,
    required: true,
    unique: true,
  },
});

// Check for existing model or create a new one
const UserModel: Model<IUser> =
  models.User || model<IUser>("User", userSchema);

export default UserModel;
