process.env.NODE_ENV = "test";
require("dotenv").config(); // Ensure this is at the top
const configureDI = require("../config.js");

const container = configureDI();

test("it tests if common definitions are added to the container", () => {
  expect(container.get("runDatabase")).toBeDefined();
  expect(container.get("session")).toBeDefined();
});

test("it tests if cars definitions are added to the container", () => {
  expect(container.get("carsController")).toBeDefined();
  expect(container.get("carsService")).toBeDefined();
  expect(container.get("carsRepository")).toBeDefined();
});

test("it tests if users definitions are added to the container", () => {
  expect(container.get("userController")).toBeDefined();
  expect(container.get("userService")).toBeDefined();
  expect(container.get("userRepository")).toBeDefined();
});

test("it tests if rents definitions are added to the container", () => {
  expect(container.get("rentsController")).toBeDefined();
  expect(container.get("rentsService")).toBeDefined();
  expect(container.get("rentsRepository")).toBeDefined();
});
