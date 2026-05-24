import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
const userStore = {
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

export { userStore as u };
//# sourceMappingURL=user-store-BIsLnfE1.js.map
