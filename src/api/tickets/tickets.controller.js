const express = require("express");
const router = express.Router();
const ticketsService = require("./tickets.service");

const getAll = (req, res, next) => {
  ticketsService
    .getAll()
    .then((tickets) => res.json(tickets))
    .catch((err) => next(err));
};

const getById = (req, res, next) => {
  ticketsService
    .getById(req.params.id)
    .then((ticket) => (ticket ? res.json(ticket) : res.sendStatus(404)))
    .catch((err) => next(err));
};

// routes
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
module.exports = router;
