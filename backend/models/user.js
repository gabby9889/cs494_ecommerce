import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, 'Your name cannot exceed 50 characters'],
    
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,

    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false,
        //to restict the password accessibility
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},{timestamps: true}
);

//encrypting password before saving the user
userSchema.pre('save', async function (next){
    if(!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//return JWT Token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME,
    });
};

//compare user password
userSchema.methods.comparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password)
}
export default mongoose.model("User", userSchema);