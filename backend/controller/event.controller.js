const { eventCollection } = require("../model/event.model");
const Mongoose = require("mongoose");

const createNewEvent = async (request, response) => {
    try {
        const tempEvent = request.body;
        const newEvent = await eventCollection.create(tempEvent);

        if (newEvent) {
            response.status(201).json({
                success: true,
                resMsg: "Event created successfully",
            });
        } else {
            response.status(400).json({
                success: false,
                resMsg: "Failed to create event",
            });
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            resMsg: "Server failed to load! Try again.",
        });
    }
};

const calculateStats = async (request, response) => {
    try {
        const { organizer } = request.params;
        const statsData = await eventCollection.aggregate([
            {
                $match: { organizer: new Mongoose.Types.ObjectId(organizer) },
            },
            {
                $addFields: {
                    eventDateTime: {
                        $dateFromString: {
                            dateString: {
                                $concat: [{ $dateToString: { format: "%Y-%m-%d", date: "$date" } }, "T", "$time", ":00"],
                            },
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    TotalEvent: { $sum: 1 },
                    UpcomingEvents: {
                        $sum: {
                            $cond: [{ $gt: ["$eventDateTime", new Date()] }, 1, 0],
                        },
                    },
                    PastEvents: {
                        $sum: {
                            $cond: [{ $lt: ["$eventDateTime", new Date()] }, 1, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    TotalEvent: 1,
                    UpcomingEvents: 1,
                    PastEvents: 1,
                },
            },
        ]);

        if (statsData.length > 0) {
            return response.status(200).json({
                success: true,
                statsData: statsData[0],
            });
        } else {
            return response.status(404).json({
                success: false,
                statsData: statsData[0],
                resMsg: "No events found",
            });
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            resMsg: "Server failed to load! Try again.",
            error: error.message,
        });
    }
};

const getAllEvents = async (request, response) => {
    try {
        const { organizer } = request.params;
        const eventData = await eventCollection.aggregate([
            {
                $match: { organizer: new Mongoose.Types.ObjectId(organizer) },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "organizer",
                    foreignField: "_id",
                    as: "organizer",
                },
            },
            {
                $unwind: "$organizer",
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    date: 1,
                    time: 1,
                    location: 1,
                    ticketPrice: 1,
                    ticketQuantity: 1,
                    isPrivate: 1,
                    createdAt: 1,
                    "organizer._id": 1,
                    "organizer.fullName": 1,
                    "organizer.profile": 1,
                },
            },
        ]);

        if (eventData.length > 0) {
            return response.status(200).json({
                success: true,
                eventData: eventData,
            });
        } else {
            return response.status(404).json({
                success: false,
                resMsg: "No events found",
            });
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            resMsg: "Server failed to load! Try again.",
        });
    }
};

const getEventdata = async (request, response) => {
    try {
        const { eventID } = request.params;
        const eventData = await eventCollection.aggregate([
            {
                $match: { _id: new Mongoose.Types.ObjectId(eventID) },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "organizer",
                    foreignField: "_id",
                    as: "organizer",
                },
            },
            {
                $unwind: "$organizer",
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    date: 1,
                    time: 1,
                    location: 1,
                    ticketPrice: 1,
                    ticketQuantity: 1,
                    isPrivate: 1,
                    createdAt: 1,
                    "organizer._id": 1,
                    "organizer.fullName": 1,
                    "organizer.profile": 1,
                },
            },
        ]);

        if (eventData.length > 0) {
            return response.status(200).json({
                success: true,
                eventData: eventData[0],
            });
        } else {
            return response.status(404).json({
                success: false,
                resMsg: "No events found",
                eventData: eventData
            });
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            resMsg: "Server failed to load! Try again.",
        });
    }
};



module.exports = {
    createNewEvent,
    calculateStats,
    getAllEvents,
    getEventdata
};
