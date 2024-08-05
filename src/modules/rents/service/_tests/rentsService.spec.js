const RentsService = require('../rentsService.js');

const mockRepository = {
  getAllRents: jest.fn(() => Promise.resolve([])),
  rentCar: jest.fn(() => Promise.resolve(true)),
  editRent: jest.fn(() => Promise.resolve(true)),
  deleteRent: jest.fn(() => Promise.resolve(true)),
  getRentById: jest.fn(() =>
    Promise.resolve({
      startDate: '2024-07-01T00:00:00.000Z',
      finishDate: '2024-07-10T00:00:00.000Z',
    }),
  ),
};

const mockCarsService = {
  getAllCars: jest.fn(() => Promise.resolve([])),
};

const mockUsersService = {
  getAllUsers: jest.fn(() => Promise.resolve([])),
};

const service = new RentsService(
  mockRepository,
  mockCarsService,
  mockUsersService,
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('it test getAllRents service', async () => {
  await service.getAllRents();
  expect(mockRepository.getAllRents).toHaveBeenCalledTimes(1);
});

test('it test rentCar service', async () => {
  const rentData = {
    car: 1,
    user: 2,
    startDate: '2024-07-01',
    finishDate: '2024-07-10',
  };
  await service.rentCar(rentData);

  const totalDays = Math.ceil(
    (new Date(rentData.finishDate) - new Date(rentData.startDate)) /
      (1000 * 60 * 60 * 24),
  );

  const expectedRentDataFormatted = {
    id: expect.any(Number), // 'id' is dynamically generated
    fk_car: rentData.car,
    fk_user: rentData.user,
    startDate: new Date(rentData.startDate).toISOString(),
    finishDate: new Date(rentData.finishDate).toISOString(),
    totalDays,
  };

  expect(mockRepository.rentCar).toHaveBeenCalledWith(
    expectedRentDataFormatted,
  );
  expect(mockRepository.rentCar).toHaveBeenCalledTimes(1);
});

test('it test editRent service', async () => {
  const rentId = 1;
  const rentData = {
    car: 123,
    user: 456,
    startDate: '2024-07-01',
    finishDate: '2024-07-10',
  };
  await service.editRent(rentId, rentData);

  const totalDays = Math.ceil(
    (new Date(rentData.finishDate) - new Date(rentData.startDate)) /
      (1000 * 60 * 60 * 24),
  );

  const expectedFormData = {
    fk_car: rentData.car,
    fk_user: rentData.user,
    startDate: rentData.startDate,
    finishDate: rentData.finishDate,
    totalDays,
  };

  expect(mockRepository.editRent).toHaveBeenCalledWith(
    rentId,
    expectedFormData,
  );
  expect(mockRepository.editRent).toHaveBeenCalledTimes(1);
});

test('it test getRentById service', async () => {
  const rentId = 1;
  await service.getRentById(rentId);
  expect(mockRepository.getRentById).toHaveBeenCalledWith(rentId);
  expect(mockRepository.getRentById).toHaveBeenCalledTimes(1);
});

test('it test deleteRent service', async () => {
  const rentId = 1;
  await service.deleteRent(rentId);
  expect(mockRepository.deleteRent).toHaveBeenCalledWith(rentId);
  expect(mockRepository.deleteRent).toHaveBeenCalledTimes(1);
});
