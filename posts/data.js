const faker = require("faker");

const allPosts = [];

const getPosts = ({ userIds }) => {
  if (!allPosts.length) {
    for (let i = 0; i < 40; i++) {
      allPosts.push({
        title: faker.random.words(10),
        content: faker.random.words(100),
        published: faker.date.past(1),
        author: userIds[Math.ceil(Math.random() * 10)],
      });
    }
  }
  return allPosts;
};

module.exports = {
  getPosts,
};
