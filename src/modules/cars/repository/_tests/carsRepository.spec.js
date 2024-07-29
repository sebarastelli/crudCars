const CarsRepository = require("../carsRepository.js");
const database = require("better-sqlite3");
const fs = require("fs");

const carData = {
  brand: "toyota",
  model: "hilux",
  year: 2022,
  kms: 15000,
  color: "red",
  ac: "yes",
  passengers: 6,
  transmission: "manual",
  picture: "",
  price: 150,
};
const carData2 = {
  brand: "toyota2",
  model: "hilux2",
  year: 2022,
  kms: 15000,
  color: "red",
  ac: "yes",
  passengers: 6,
  transmission: "manual",
  picture: "",
  price: 150,
};

let mockDataBase;

beforeEach(() => {
  mockDataBase = new database(":memory:");
  const migration = fs.readFileSync("./src/db/tables.sql", "utf-8");
  mockDataBase.exec(migration);
});

test("it tests postCar", () => {
  const repository = new CarsRepository(mockDataBase);
  const car = repository.postCar(carData);
  expect(car.changes).toEqual(1);
  expect(car.lastInsertRowid).toEqual(1);
});

test("it test getCarById", () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(carData);
  const car = repository.getCarById(1);
  expect(car).toEqual({ id: 1, ...carData });
});

test("it test editCar", () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(carData);
  const updatedCarData = {
    id: 1,
    brand: "toyota",
    model: "corolla",
    year: 2022,
    kms: 15000,
    color: "red",
    ac: "yes",
    passengers: 6,
    transmission: "manual",
    picture: "",
    price: 150,
  };
  repository.editCar(updatedCarData);
  const car = repository.getCarById(1);
  expect(car).toEqual({ id: 1, ...updatedCarData });
});

test("it test deleteCar", () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(carData);
  repository.deleteCar(1);
  const car = repository.getCarById(1);
  expect(car).toEqual(undefined);
});

test("it test getAllCars", () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(carData);
  repository.postCar(carData2);
  const cars = repository.getAllCars();
  expect(cars).toEqual([
    { id: 1, ...carData },
    { id: 2, ...carData2 },
  ]);
});
