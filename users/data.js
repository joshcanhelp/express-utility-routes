const faker = require("faker");

const userCount = 10;
const allUsers = [];
const allUserIds = [];

const getUsers = ({ knownUsers = [] } = {}) => {
  if (allUsers.length) {
    return allUsers;
  }

  for (let i = 0; i < userCount; i++) {
    const userId = faker.datatype.uuid();
    allUserIds.push(userId);
    const knownUser = knownUsers.pop() || {};
    allUsers.push({
      id: userId,
      email: faker.internet.email(),
      username: faker.internet.userName(),
      name: faker.name.findName(),
      roles: [],
      ...knownUser
    });
  }
  return allUsers;
};

module.exports = {
  getUsers,
};
