const faker = require("faker");

const allPosts = [];

const getPosts = ({ authorIds = [], reload = false, count = 20 } = {}) => {
  if (allPosts.length && !reload) {
    return allPosts;
  }

  while (allPosts.length) {
    allPosts.pop();
  }

  for (let i = 0; i < count; i++) {
    const newPost = {
      title: faker.random.words(5),
      content: faker.random.words(50),
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
