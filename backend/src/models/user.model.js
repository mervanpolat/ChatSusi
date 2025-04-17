import mongoose from "mongoose";

// Creating the userSchema, with the following fields and their corresponding attributes.
const userSchema = new mongoose.Schema(
     {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        profilePic: {
            type: String,
            default: "",
        },
     },
     // It's considered best practice to include timestamps in our schemas. 
     {timestamps: true}
);

// We are creating a model user dependent on the userSchema
const User = mongoose.model("User", userSchema);

// We are exporting this, so that we can reuse it anywhere in our application
export default User;