const faker = require("faker");

const userCount = 10;
const allUsers = [];

const getUsers = ({ knownUsers = [], reload = false } = {}) => {
  if (allUsers.length && !reload) {
    return allUsers;
  }

  while (allUsers.length) {
    allUsers.pop();
  }

  for (let i = 0; i < userCount; i++) {
    const knownUser = knownUsers.pop() || {};
    addUser({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
      ...knownUser,
    });
  }
  return allUsers;
};

const addUser = (newUser) => {
  allUsers.some((user) => {
    if (user.email === newUser.email) {
      throw new Error(`The email ${newUser.email} already exists.`);
    }

    if (user.id === newUser.id) {
      throw new Error(`The ID ${newUser.id} already exists.`);
    }
  });

  newUser.id = newUser.id || faker.datatype.uuid();
  newUser.roles = newUser.roles || [];
  allUsers.push(newUser);
  return newUser;
};

module.exports = {
  getUsers,
  addUser,
};
