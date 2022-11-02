const config = require("config.json");
const jwt = require("jsonwebtoken");
const users = require("db/users.json");

const authenticate = async ({ username, password }) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
};

const getAll = async () => {
  return users.map((u) => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
};

const getById = async (id) => {
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = {
  authenticate,
  getAll,
  getById,
};
