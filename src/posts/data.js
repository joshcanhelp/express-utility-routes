const faker = require("faker");

const postsCount = 30;
const allPosts = [];

const getPosts = ({ authorIds = [], reload = false } = {}) => {
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

    if (authorIds.length) {
      const randomUserId =
        authorIds[Math.ceil(Math.random() * authorIds.length) - 1];
      newPost.author = randomUserId;
    }

    allPosts.push(newPost);
  }

  return allPosts;
};

module.exports = {
  getPosts,
};
