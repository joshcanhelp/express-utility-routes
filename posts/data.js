const faker = require("faker");

const postsCount = 30;
const allPosts = [];

const getPosts = ({ userIds = [], reload = false } = {}) => {
  if (allPosts.length && !reload) {
    return allPosts;
  }

  while (allPosts.length) {
    allPosts.pop();
  }

  for (let i = 0; i < postsCount; i++) {
    const newPost = {
      title: faker.random.words(10),
      content: faker.random.words(100),
      published: faker.date.past(1),
    };

    if (userIds.length) {
      const randomUserId =
        userIds[Math.ceil(Math.random() * userIds.length) - 1];
      newPost.author = randomUserId;
    }

    allPosts.push(newPost);
  }

  return allPosts;
};

module.exports = {
  getPosts,
};
