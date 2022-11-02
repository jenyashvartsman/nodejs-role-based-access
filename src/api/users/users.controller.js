const express = require("express");
const router = express.Router();
const usersService = require("./users.service");
const authorize = require("src/helpers/authorize");
const Role = require("src/helpers/role");

const authenticate = (req, res, next) => {
  usersService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
};

const getAll = (req, res, next) => {
  usersService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

const getById = (req, res, next) => {
  usersService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
};

// routes
router.post("/authenticate", authenticate); // public
router.get("/", authorize(Role.Admin), getAll); // admin
router.get("/:id", authorize(), getById); // all
module.exports = router;
