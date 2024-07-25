const UserRepository = require("../userRepository.js");
const database = require("better-sqlite3");
const fs = require("fs");

let mockDataBase;
const userData = {
  id: 1,
  name: "John",
  surname: "Doe",
  age: "30",
  phone: 5551234,
  email: "john.doe@example.com",
  document: 12345678,
};

beforeEach(() => {
  mockDataBase = new database(":memory:");
  const migration = fs.readFileSync("./src/db/tables.sql", "utf-8");
  mockDataBase.exec(migration);
});

test("it test createUser", () => {
  const userRepository = new UserRepository(mockDataBase);
  const user = userRepository.createUser(userData);
  expect(user.changes).toEqual(1);
  expect(user.lastInsertRowid).toEqual(1);
});

test("it test editUser", () => {
  const userRepository = new UserRepository(mockDataBase);
  userRepository.createUser(userData);
  const updatedUser = {
    id: 1,
    name: "Juan",
    surname: "Dos",
    age: "31",
    phone: 5551234,
    email: "john.doe@example.com",
    document: 12345678,
  };
  userRepository.editUser(updatedUser);
  const user = userRepository.getUserById(1);
  expect(user).toEqual({ id: 1, ...updatedUser });
});

test("it test getUserById", () => {
  const userRepository = new UserRepository(mockDataBase);
  userRepository.createUser(userData);
  const user = userRepository.getUserById(1);
  expect(user).toEqual(userData);
});

test("it test deleteUser", () => {
  const userRepository = new UserRepository(mockDataBase);
  userRepository.createUser(userData);
  userRepository.deleteUser(1);
  const user = userRepository.getUserById(1);
  expect(user).toBeUndefined();
});

test("it test getAllUsers", () => {
  const userRepository = new UserRepository(mockDataBase);
  userRepository.createUser(userData);
  userRepository.createUser({
    id: 2,
    name: "Juan",
    surname: "Dos",
    age: "31",
    phone: 5551234,
    email: "john.doe@example.com",
    document: 12345678,
  });
  const users = userRepository.getAllUsers();
  expect(users).toEqual([
    userData,
    {
      id: 2,
      name: "Juan",
      surname: "Dos",
      age: "31",
      phone: 5551234,
      email: "john.doe@example.com",
      document: 12345678,
    },
  ]);
});
