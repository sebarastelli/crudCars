const CarsService = require('../carsService.js');

const mockRepository = {
  getAllCars: jest.fn(),
  postCar: jest.fn(),
  editCar: jest.fn(),
  deleteCar: jest.fn(),
  getCarById: jest.fn(),
};
const service = new CarsService(mockRepository);

test('it tests getAllCars from repository', async () => {
  mockRepository.getAllCars.mockResolvedValue([]);

  await service.getAllCars();
  expect(mockRepository.getAllCars).toHaveBeenCalledTimes(1);
});

test('it tests that postCar from repository is called', async () => {
  mockRepository.postCar.mockResolvedValue();

  const carData = { brand: 'Toyota', model: 'Camry' }; // Example data
  await service.postCar(carData);
  expect(mockRepository.postCar).toHaveBeenCalledTimes(1);
  expect(mockRepository.postCar).toHaveBeenCalledWith(expect.any(Object)); // Assuming it is called with a Car instance
});

test('it tests that editCar from repository is called', async () => {
  mockRepository.editCar.mockResolvedValue();

  const carData = { id: 1, brand: 'Toyota', model: 'Camry' }; // Example data
  await service.editCar(carData);
  expect(mockRepository.editCar).toHaveBeenCalledTimes(1);
  expect(mockRepository.editCar).toHaveBeenCalledWith(expect.any(Object)); // Assuming it is called with a Car instance
});

test('it tests that deleteCar from repository is called', async () => {
  mockRepository.deleteCar.mockResolvedValue();

  await service.deleteCar(1);
  expect(mockRepository.deleteCar).toHaveBeenCalledTimes(1);
});

test('it tests that getCarById from repository is called', async () => {
  mockRepository.getCarById.mockResolvedValue({
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    kms: 10000,
    color: 'Red',
    ac: true,
    passengers: 5,
    transmission: 'Automatic',
    picture: 'url-to-picture',
    price: 20000,
  });

  await service.getCarById(1);
  expect(mockRepository.getCarById).toHaveBeenCalledTimes(1);
  expect(mockRepository.getCarById).toHaveBeenCalledWith(1);
});
