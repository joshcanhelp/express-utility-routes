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
    const userId = faker.datatype.uuid();
    const knownUser = knownUsers.pop() || {};
    addUser({
      id: userId,
      email: faker.internet.email(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
      roles: [],
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
  });

  allUsers.push(newUser);
}

module.exports = {
  getUsers,
  addUser
};
