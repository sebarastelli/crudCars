const RentsService = require("../rentsService.js");

const mockRepository = {
  getAllRents: jest.fn(),
  rentCar: jest.fn(),
  editRent: jest.fn(),
  deleteRent: jest.fn(),
  getRentById: jest.fn(),
};
const service = new RentsService(mockRepository);

test("it test getAllRents service", () => {
  service.getAllRents();
  expect(mockRepository.getAllRents).toHaveBeenCalled();
});

test("it test rentCar service", () => {
  service.rentCar({});
  expect(mockRepository.rentCar).toHaveBeenCalled();
});

test("it test editCar  service", () => {
  service.editRent({});
  expect(mockRepository.editRent).toHaveBeenCalled();
});

test("it test getRentById service", () => {
  service.getRentById({});
  expect(mockRepository.getRentById).toHaveBeenCalled();
});

test("it test deleteRent", () => {
  service.deleteRent(1);
  expect(mockRepository.deleteRent).toHaveBeenCalled();
});
