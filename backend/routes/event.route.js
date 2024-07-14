const eventRoute = require("express").Router();
const { createNewEvent} = require("../controller/event.controller");

eventRoute.post("/create-new-events", createNewEvent);

module.exports = { eventRoute }