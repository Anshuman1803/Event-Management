const { eventCollection } = require("../model/event.model");
const { eventRegistrationCollection } = require("../model/eventregistration.model");
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
      await eventCollection.updateOne(
        { _id: EventID },
        {
          $addToSet: { registeredUser: UserID },
          $inc: { soldTickets: QuantityofTickets },
        }
      );

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
    const statsData = {
      totalEvents: 0,
      totalUpcomingEvents: 0,
      totalPastEvents: 0,
      totalTicketSales: 0,
      totalIncome: 0,         
      registeredUsers: 0,

    };
    const upcomingEvents = [];
    const pastEvents = [];
    const currentDate = new Date();
    const allEvents = await eventCollection.aggregate([
      {
        $match: { organizer: new Mongoose.Types.ObjectId(organizer) },
      },
    ]);

    statsData.totalEvents = allEvents.length;
    allEvents.forEach((event) => {
      const eventDate = new Date(event.date);
      statsData.totalTicketSales = statsData.totalTicketSales + event.soldTickets;
      statsData.totalIncome = statsData.totalIncome + (event.ticketPrice * event.soldTickets);
      statsData.registeredUsers = statsData.registeredUsers + event.registeredUser.length;
      if (eventDate > currentDate) {
        statsData.totalUpcomingEvents = statsData.totalUpcomingEvents + 1;
      } else {
        statsData.totalPastEvents = statsData.totalPastEvents + 1;
      }
    });

    if (allEvents.length > 0) {
      return response.status(200).json({
        success: true,
        statsData : statsData
      });
    } else {
      return response.json({
        success: false,
        statsData : statsData,
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
          soldTickets: 1,
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
        $lookup :{
          from: "eventregistrations",
          localField: "_id",
          foreignField: "EventID",
          as: "registeredUserDetails",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "UserID",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind : "$user"
            },{
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: [
                    {
                      phone: "$phone",
                      QuantityofTickets: "$QuantityofTickets",
                      TotalPricePaid: "$TotalPricePaid",
                      PurchaseDate: "$PurchaseDate",
                    },
                    "$user",
                  ],
                },
              },
            },
          ],
        }
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
          soldTickets: 1,
          "registeredUserDetails.phone": 1,
          "registeredUserDetails.QuantityofTickets": 1,
          "registeredUserDetails.TotalPricePaid": 1,
          "registeredUserDetails.PurchaseDate": 1,
          "registeredUserDetails.email": 1,
          "registeredUserDetails.fullName": 1,
          "registeredUserDetails._id": 1,
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
          soldTickets: 1,
          registeredUser: 1,
          "organizer._id": 1,
          "organizer.fullName": 1,
          "organizer.profile": 1,
        },
      },
    ]);

    if (allData.length > 0) {
      return response.status(200).json({
        success: true,
        allData : allData
      });
    } else {
      return response.status(404).json({
        success: false,
        resMsg: "No events found",
        allData : allData
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
