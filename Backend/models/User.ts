import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject() as any;

  object.uid = _id.toString();

  return object;
});

const User = mongoose.model("User", userSchema);

export default User;
