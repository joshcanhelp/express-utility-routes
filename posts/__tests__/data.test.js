const faker = require("faker");
const { beforeAll, describe, it } = require("@jest/globals");
const { getPosts } = require("../data");

describe("getPosts", () => {
  let firstGetPosts, secondGetPosts;

  beforeAll(() => {
    firstGetPosts = getPosts();
    secondGetPosts = getPosts();
  });

  it("returns 30 posts", () => {
    expect(firstGetPosts.length).toEqual(30);
  });

  it("does not change data between calls", () => {
    expect(firstGetPosts).toMatchObject(secondGetPosts);
  });

  describe("posts without users", () => {
    let firstPost;

    beforeAll(() => {
      firstPost = firstGetPosts[0];
    });

    it("generates posts with a title by default", () => {
      expect(firstPost).toHaveProperty("title");
    });

    it("generates posts with content by default", () => {
      expect(firstPost).toHaveProperty("content");
    });

    it("generates posts with a published date by default", () => {
      expect(firstPost).toHaveProperty("published");
    });

    it("generates posts without an author by default", () => {
      expect(firstPost).not.toHaveProperty("author");
    });
  });

  describe("posts with users", () => {
    let authorId, postsWithUsers, firstPostWithUsers;

    beforeAll(() => {
      authorId = faker.datatype.uuid();
      postsWithUsers = getPosts({ userIds: [authorId], reload: true });
      firstPostWithUsers = postsWithUsers[0];
    });

    it("generates posts with an author if there are users", () => {
      expect(firstPostWithUsers).toHaveProperty("author");
      expect(firstPostWithUsers.author).toEqual(authorId);
    });
  });
});
