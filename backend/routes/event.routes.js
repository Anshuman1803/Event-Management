const eventRoute = require("express").Router();
const { createNewEvent, getAllEvents, calculateStats, getEventdata, getEvents, eventRegistration, getTickets} = require("../controller/event.controller");

eventRoute.post("/create-new-events", createNewEvent);
eventRoute.post("/register-for-event", eventRegistration);
eventRoute.get("/calculate-user-stats/:organizer", calculateStats);
eventRoute.get("/get-All-events/:organizer", getAllEvents);
eventRoute.get("/get-event/:eventID", getEventdata);
eventRoute.get("/get-event", getEvents);
eventRoute.get("/get-tickets/:userID", getTickets);

module.exports = { eventRoute }