const CarsRepository = require('../carsRepository.js');
const Car = require('../../entity/Car.js');
const database = require('better-sqlite3');
const fs = require('fs');

const carData = {
  brand: 'toyota',
  model: 'hilux',
  year: 2022,
  kms: 15000,
  color: 'red',
  ac: 'yes',
  passengers: 6,
  transmission: 'manual',
  picture: '',
  price: 150,
};

const carData2 = {
  brand: 'toyota2',
  model: 'hilux2',
  year: 2022,
  kms: 15000,
  color: 'red',
  ac: 'yes',
  passengers: 6,
  transmission: 'manual',
  picture: '',
  price: 150,
};

const updatedCarData = {
  id: 1,
  brand: 'toyota',
  model: 'corolla',
  year: 2022,
  kms: 15000,
  color: 'red',
  ac: 'yes',
  passengers: 6,
  transmission: 'manual',
  picture: '',
  price: 150,
};

const updatedCar = new Car(
  updatedCarData.id,
  updatedCarData.brand,
  updatedCarData.model,
  updatedCarData.year,
  updatedCarData.kms,
  updatedCarData.color,
  updatedCarData.ac,
  updatedCarData.passengers,
  updatedCarData.transmission,
  updatedCarData.picture,
  updatedCarData.price,
);

let mockDataBase;

beforeEach(() => {
  mockDataBase = new database(':memory:');
  const migration = fs.readFileSync('./src/db/tables.sql', 'utf-8');
  mockDataBase.exec(migration);
});

test('it tests postCar', () => {
  const repository = new CarsRepository(mockDataBase);
  const result = repository.postCar(new Car(null, ...Object.values(carData)));
  expect(result.changes).toEqual(1);
  expect(result.lastInsertRowid).toEqual(1);
});

test('it tests getCarById', () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(new Car(null, ...Object.values(carData)));
  const car = repository.getCarById(1);
  expect(car).toEqual(new Car(1, ...Object.values(carData)));
});

test('it tests editCar', () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(new Car(null, ...Object.values(carData)));
  repository.editCar(updatedCar);
  const car = repository.getCarById(1);
  expect(car).toEqual(updatedCar);
});

test('it tests deleteCar', () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(new Car(null, ...Object.values(carData)));
  repository.deleteCar(1);
  const car = repository.getCarById(1);
  expect(car).toBeUndefined();
});

test('it tests getAllCars', () => {
  const repository = new CarsRepository(mockDataBase);
  repository.postCar(new Car(null, ...Object.values(carData)));
  repository.postCar(new Car(null, ...Object.values(carData2)));
  const cars = repository.getAllCars();
  expect(cars).toEqual([
    new Car(1, ...Object.values(carData)),
    new Car(2, ...Object.values(carData2)),
  ]);
});
