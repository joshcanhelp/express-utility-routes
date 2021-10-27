const faker = require("faker");
const { beforeAll, describe, it } = require("@jest/globals");
const { getUsers, addUser } = require("../data");

describe("getUsers", () => {
  let firstGetUsers, secondGetUsers, firstUser;

  beforeAll(() => {
    firstGetUsers = getUsers();
    firstUser = firstGetUsers[0];
    secondGetUsers = getUsers();
  });

  it("returns 10 users", () => {
    expect(firstGetUsers.length).toEqual(10);
  });

  it("does not change data between calls", () => {
    expect(firstGetUsers).toMatchObject(secondGetUsers);
  });

  it("generates users with an id", () => {
    expect(firstUser).toHaveProperty("id");
    expect(typeof firstUser.id).toBe("string");
    expect(firstUser.id).not.toBe("");
  });

  it("generates users with an email", () => {
    expect(firstUser).toHaveProperty("email");
    expect(typeof firstUser.email).toBe("string");
    expect(firstUser.email).not.toBe("");
  });

  it("generates users with a username", () => {
    expect(firstUser).toHaveProperty("username");
    expect(typeof firstUser.username).toBe("string");
    expect(firstUser.username).not.toBe("");
  });

  it("generates users with a name", () => {
    expect(firstUser).toHaveProperty("name");
    expect(typeof firstUser.name).toBe("string");
    expect(firstUser.name).not.toBe("");
  });

  it("generates users with empty roles", () => {
    expect(firstUser).toHaveProperty("roles");
    expect(firstUser.roles).toEqual([]);
  });

  describe("overwriting properties", () => {
    it("overrides one user's id", () => {
      const localUsers = getUsers({
        knownUsers: [{ id: "__known_id__" }],
        reload: true,
      });
      expect(localUsers[0].id).toEqual("__known_id__");
    });

    it("overrides one user's email", () => {
      const localUsers = getUsers({
        knownUsers: [{ email: "__known_email__" }],
        reload: true,
      });
      expect(localUsers[0].email).toEqual("__known_email__");
    });

    it("overrides one user's username", () => {
      const localUsers = getUsers({
        knownUsers: [{ username: "__known_username__" }],
        reload: true,
      });
      expect(localUsers[0].username).toEqual("__known_username__");
    });

    it("overrides one user's name", () => {
      const localUsers = getUsers({
        knownUsers: [{ name: "__known_name__" }],
        reload: true,
      });
      expect(localUsers[0].name).toEqual("__known_name__");
    });

    it("overrides one user's roles", () => {
      const localUsers = getUsers({
        knownUsers: [{ roles: ["__known_role__"] }],
        reload: true,
      });
      expect(localUsers[0].roles).toEqual(["__known_role__"]);
    });
  });
});

describe("addUser", () => {
  let allUsers;

  beforeAll(() => {
    allUsers = getUsers();
  });

  it("throws an error if a user already exists", () => {
    expect(() => {
      addUser({ email: allUsers[0].email })
    }).toThrowError();
  })
});
