const RentsController = require('../rentsController.js');

const mockCarsService = {
  getAllCars: jest.fn(() => Promise.resolve([])),
};

const mockUsersService = {
  getAllUsers: jest.fn(() => Promise.resolve([])),
};

const mockService = {
  getAllRents: jest.fn(() => Promise.resolve([])),
  rentCar: jest.fn(),
  editRent: jest.fn(),
  deleteRent: jest.fn(() => Promise.resolve(true)),
  getRentById: jest.fn(() =>
    Promise.resolve({
      startDate: '2024-07-01T00:00:00.000Z',
      finishDate: '2024-07-10T00:00:00.000Z',
    }),
  ),
  getEditRentFormDetails: jest.fn(() =>
    Promise.resolve({
      rentData: {
        startDate: '2024-07-01',
        finishDate: '2024-07-10',
      },
      users: [],
      cars: [],
    }),
  ),
  getRentFormDetails: jest.fn(() =>
    Promise.resolve({
      users: [],
      cars: [],
    }),
  ),
};

const controller = new RentsController(
  mockService,
  mockCarsService,
  mockUsersService,
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('it test rentsRoutes', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };
  controller.rentsRoutes(app);
  expect(app.get).toHaveBeenCalledWith('/rents', expect.any(Function));
  expect(app.get).toHaveBeenCalledWith('/rents/rentForm', expect.any(Function));
  expect(app.post).toHaveBeenCalledWith(
    '/rents/rentForm',
    expect.any(Function),
  );
  expect(app.get).toHaveBeenCalledWith(
    '/rents/editRent/:id',
    expect.any(Function),
  );
  expect(app.post).toHaveBeenCalledWith(
    '/rents/editRent/:id',
    expect.any(Function),
  );
  expect(app.get).toHaveBeenCalledWith(
    '/rents/deleteRent/:id',
    expect.any(Function),
  );
});

test('it test rentsPage', async () => {
  const mockRender = jest.fn();
  await controller.rentsPage(
    { session: { errors: [] } },
    { render: mockRender },
  );
  expect(mockRender).toHaveBeenCalledTimes(1);
  expect(mockRender).toHaveBeenCalledWith('rents/views/allRents.html', {
    rentedCars: [],
  });
});

test('it test rentForm render', async () => {
  const mockRender = jest.fn();
  await controller.rentForm({}, { render: mockRender });
  expect(mockRender).toHaveBeenCalledTimes(1);
  expect(mockRender).toHaveBeenCalledWith('rents/views/rentForm.html', {
    cars: [],
    users: [],
  });
});

test('it test rentCar controller', async () => {
  const mockRedirect = jest.fn();
  const req = {
    body: {
      car: 1,
      user: 2,
      startDate: '2024-07-01',
      finishDate: '2024-07-10',
    },
  };
  const res = {
    redirect: mockRedirect,
  };
  await controller.rentCar(req, res);
  const expectedRentData = {
    car: 1,
    user: 2,
    startDate: '2024-07-01',
    finishDate: '2024-07-10',
  };
  expect(mockService.rentCar).toHaveBeenCalledWith(expectedRentData);
  expect(mockService.rentCar).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledWith('/rents');
  expect(mockRedirect).toHaveBeenCalledTimes(1);
});

test('it test editRentForm render', async () => {
  const mockRender = jest.fn();
  const req = { params: { id: 1 } };
  const res = { render: mockRender };

  mockService.getEditRentFormDetails = jest.fn(() =>
    Promise.resolve({
      rentData: {
        startDate: '2024-07-01',
        finishDate: '2024-07-10',
      },
      users: [],
      cars: [],
    }),
  );

  await controller.editRentForm(req, res);

  const expectedRentData = {
    startDate: '2024-07-01',
    finishDate: '2024-07-10',
  };

  expect(mockService.getEditRentFormDetails).toHaveBeenCalledWith(1);
  expect(mockService.getEditRentFormDetails).toHaveBeenCalledTimes(1);
  expect(mockCarsService.getAllCars).toHaveBeenCalledTimes(1);
  expect(mockUsersService.getAllUsers).toHaveBeenCalledTimes(1);

  expect(mockRender).toHaveBeenCalledWith('rents/views/editRent.html', {
    rentData: expectedRentData,
    users: [],
    cars: [],
  });
  expect(mockRender).toHaveBeenCalledTimes(1);
});

test('it test editRent controller', async () => {
  const mockRedirect = jest.fn();
  const req = {
    params: { id: 1 },
    body: {
      car: 123,
      user: 456,
      startDate: '2024-07-01',
      finishDate: '2024-07-10',
    },
  };
  const res = {
    redirect: mockRedirect,
  };
  await controller.editRent(req, res);
  const expectedFormData = {
    id: 1,
    car: 123,
    user: 456,
    startDate: '2024-07-01',
    finishDate: '2024-07-10',
  };
  expect(mockService.editRent).toHaveBeenCalledWith(expectedFormData);
  expect(mockService.editRent).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledWith('/rents');
  expect(mockRedirect).toHaveBeenCalledTimes(1);
});

test('it test deleteRent controller', async () => {
  const mockRedirect = jest.fn();
  const req = { params: { id: 1 } };
  const res = { redirect: mockRedirect };
  await controller.deleteRent(req, res);
  expect(mockService.deleteRent).toHaveBeenCalledWith(1);
  expect(mockService.deleteRent).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledWith('/rents');
});
