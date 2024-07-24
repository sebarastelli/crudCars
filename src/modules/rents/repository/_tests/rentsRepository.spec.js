const RentsRepository = require("../rentsRepository.js");
const database = require("better-sqlite3");
const fs = require("fs");

let mockDataBase;

const rentData = {
  id: 1,
  fk_car: 1,
  fk_user: 2,
  startDate: "2024-07-01T00:00:00.000Z",
  finishDate: "2024-07-10T00:00:00.000Z",
  totalDays: 9,
};

beforeEach(() => {
  mockDataBase = new database(":memory:");
  const migration = fs.readFileSync("./src/db/tables.sql", "utf-8");
  mockDataBase.exec(migration);
  mockDataBase.exec(`
        INSERT INTO users (id, name, surname, age, phone, email, document)
        VALUES (1, 'John', 'Doe', 30, '555-1234', 'john.doe@example.com', '12345678'),
               (2, 'Jane', 'Smith', 25, '555-5678', 'jane.smith@example.com', '87654321');
    `);
  mockDataBase.exec(`
        INSERT INTO cars (id, brand, model, year, kms, color, ac, passengers, transmission, picture, price)
        VALUES (1, 'Toyota', 'Corolla', 2022, 10000, 'Red', 'Yes', 5, 'Manual', '', 20000),
               (2, 'Honda', 'Civic', 2022, 12000, 'Blue', 'Yes', 5, 'Automatic', '', 22000);
    `);
});

test("it tests rentCar", () => {
  const repository = new RentsRepository(mockDataBase);
  const rent = repository.rentCar(rentData);
  expect(rent.changes).toEqual(1);
  expect(rent.lastInsertRowid).toEqual(1);
});

test("it test getRentById", () => {
  const repository = new RentsRepository(mockDataBase);
  repository.rentCar(rentData);
  const rent = repository.getRentById(1);
  rent.fk_car = Number(rent.fk_car);
  rent.fk_user = Number(rent.fk_user);
  expect(rent).toEqual(rentData);
});

test("it test editRent", () => {
  const repository = new RentsRepository(mockDataBase);
  repository.rentCar(rentData);
  const updatedRentData = {
    id: 1,
    fk_car: 2,
    fk_user: 1,
    startDate: "2024-07-02T00:00:00.000Z",
    finishDate: "2024-07-11T00:00:00.000Z",
    totalDays: 10,
  };
  repository.editRent(1, updatedRentData);
  const updatedRent = repository.getRentById(1);
  updatedRent.fk_car = Number(updatedRent.fk_car);
  updatedRent.fk_user = Number(updatedRent.fk_user);
  expect(updatedRent).toEqual(updatedRentData);
});

test("it test deleteRent", () => {
  const repository = new RentsRepository(mockDataBase);
  repository.rentCar(rentData);
  repository.deleteRent(1);
  const rent = repository.getRentById(1);
  expect(rent).toBeUndefined();
});
