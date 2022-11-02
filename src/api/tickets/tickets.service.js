const tickets = require("db/tickets.json");

const getAll = async () => {
  return [...tickets];
};

const getById = async (id) => {
  return tickets.find((t) => t.id === parseInt(id)) || null;
};

module.exports = {
  getAll,
  getById,
};
