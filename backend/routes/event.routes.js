const eventRoute = require("express").Router();
const { createNewEvent, getAllEvents, calculateStats, getEventdata, getEvents, eventRegistration, getTickets} = require("../controller/event.controller");
const { userAuthenticate } = require("../middleware/Authenticate");

eventRoute.post("/create-new-events",userAuthenticate, createNewEvent);
eventRoute.post("/register-for-event",userAuthenticate, eventRegistration);
eventRoute.get("/calculate-user-stats/:organizer",userAuthenticate, calculateStats);
eventRoute.get("/get-All-events/:organizer",userAuthenticate, getAllEvents);
eventRoute.get("/get-event/:eventID",userAuthenticate, getEventdata);
eventRoute.get("/get-event",userAuthenticate, getEvents);
eventRoute.get("/get-tickets/:userID",userAuthenticate, getTickets);

module.exports = { eventRoute }