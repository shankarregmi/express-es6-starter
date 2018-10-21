import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    }
}, 
{timestamps: true});

let UserModel = mongoose.model('Users', UserSchema);

export default UserModel;