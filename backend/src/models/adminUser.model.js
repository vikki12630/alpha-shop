import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  
);

adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

adminUserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminUserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const AdminUser = mongoose.model("AdminUser", adminUserSchema);
