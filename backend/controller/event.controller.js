const { eventCollection } = require("../model/event.model");
const { eventRegistrationCollection } = require("../model/eventregistration.model");
const { userCollection } = require("../model/user.model");
const Mongoose = require("mongoose");

// !create new events
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

// You'd update the user's document in userCollection to include the new event in their list of registered events.
// You'd update the event's document in eventCollection to increment the "Tickets Sold" field.
// ! Register the user for the events
const eventRegistration = async (request, response) => {
  try {
    const { UserID, phone, EventID, QuantityofTickets, TotalPricePaid } = request.body;

    // create the registration
    const newRegistration = await eventRegistrationCollection.create({
      UserID: UserID,
      phone: phone,
      EventID: EventID,
      QuantityofTickets: QuantityofTickets,
      TotalPricePaid: TotalPricePaid,
      PurchaseDate: Date.now(),
    });
    if (newRegistration) {
      await eventCollection.updateOne({ _id: EventID }, { $inc: { soldTickets: QuantityofTickets } });
      await userCollection.updateOne({ _id: UserID }, { $push: { registeredEvents: EventID } });

      response.status(201).json({
        success: true,
        resMsg: "User registered for the event successfully",
      });

    } else {
      response.json({
        success: false,
        resMsg: "Failed to register the user for the event",
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

// ! Caluculates the stats of events, registred users, ticket sales and incomes
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

// ! get the all event data related to the particular organizer
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

// ! show the individual events data
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
        eventData: eventData,
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      resMsg: "Server failed to load! Try again.",
    });
  }
};

//! Get all the events for audience
const getEvents = async (request, response) => {
  try {
    const currentDate = new Date();
    const upcomingEvents = [];
    const pastEvents = [];

    const allData = await eventCollection.aggregate([
      {
        $match: {},
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

    allData.forEach((event) => {
      const eventDate = new Date(event.date);
      if (eventDate > currentDate) {
        upcomingEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    });

    if (allData.length > 0) {
      return response.status(200).json({
        success: true,
        upcomingEvents: upcomingEvents,
        pastEvents: pastEvents,
      });
    } else {
      return response.status(404).json({
        success: false,
        resMsg: "No events found",
        upcomingEvents: upcomingEvents,
        pastEvents: pastEvents,
      });
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      resMsg: "Server failed to load! Try again.",
      error: error.message,
    });
  }
};

module.exports = {
  createNewEvent,
  eventRegistration,
  calculateStats,
  getAllEvents,
  getEventdata,
  getEvents,
};
