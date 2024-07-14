const { eventCollection } = require("../model/event.model");

const createNewEvent = async (request, response) => {
    try {
        const tempEvent = request.body;
        const newEvent = await eventCollection.create(tempEvent)

        if (newEvent) {
            response.status(201).json({
                success: true,
                resMsg: "Event created successfully",
            })
        } else {
            response.status(400).json({
                success: false,
                resMsg: "Failed to create event",
            })
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            resMsg: "Server failed to load! Try again.",
        })
    }
}
module.exports = {
    createNewEvent
};
