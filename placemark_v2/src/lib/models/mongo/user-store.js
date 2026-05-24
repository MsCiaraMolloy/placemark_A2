import { User } from './user.js';

export const userStore = {
  async getAllUsers() {
    return User.find().lean();
  },
  async getUserById(id) {
    if (!id) return null;
    return User.findOne({ _id: id }).lean();
  },
  async getUserByEmail(email) {
    return User.findOne({ email }).lean();
  },
  async addUser(user) {
    const saved = await new User(user).save();
    return this.getUserById(saved._id);
  },
  async deleteUserById(id) {
    await User.deleteOne({ _id: id });
  },
  async deleteAll() {
    await User.deleteMany({});
  }
};
