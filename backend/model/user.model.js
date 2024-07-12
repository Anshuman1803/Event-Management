const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String
    },
    socialLogins: {
        google: String,
        facebook: String
    },
    role: {
        type: String,
        enum: ['attendee', 'organizer', 'admin'],
        default: 'attendee'
    },
    createdEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    attendedEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    registeredEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const userCollection = mongoose.model("users", UserSchema);

module.exports = { userCollection };