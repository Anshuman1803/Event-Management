const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
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
    profile: {
        type: String
    },
    socialLogins: {
        google: String,
        facebook: String
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: ['audience', 'organizer'],
        default: 'audience'
    },
    attendedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        _id: { type: mongoose.Schema.Types.ObjectId, auto: false },
        ref: 'Event'
    }],
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        _id: { type: mongoose.Schema.Types.ObjectId, auto: false },
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