const carsService = require("../carsService.js");

const mockRepository = {
  getAllCars: jest.fn(),
  postCar: jest.fn(),
  editCar: jest.fn(),
  deleteCar: jest.fn(),
  getCarById: jest.fn(),
};
const service = new carsService(mockRepository);

test("it tests getAllCars from repository", () => {
  service.getAllCars();
  expect(mockRepository.getAllCars).toHaveBeenCalledTimes(1);
});

test("it tests that addCar from repository", () => {
  service.postCar({});
  expect(mockRepository.postCar).toHaveBeenCalledTimes(1);
});

test("it tests that editCar from repository", () => {
  service.editCar({});
  expect(mockRepository.editCar).toHaveBeenCalledTimes(1);
});

test("it test that deleteCar from repository", () => {
  service.deleteCar(1);
  expect(mockRepository.deleteCar).toHaveBeenCalledTimes(1);
});

test("it test that getCarById from repository", () => {
  service.getCarById(1);
  expect(mockRepository.getCarById).toHaveBeenCalledTimes(1);
});
