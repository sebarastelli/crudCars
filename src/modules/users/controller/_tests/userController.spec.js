const userController = require('../userController.js');

const uploadDataHandler = {
  single: jest.fn(),
};

const mockService = {
  getAllUsers: jest.fn(() => Promise.resolve([])),
  getUserById: jest.fn(() => Promise.resolve({})),
  createUser: jest.fn(),
  editUser: jest.fn(),
  deleteUser: jest.fn(() => Promise.resolve(true)),
};

const controller = new userController(mockService, uploadDataHandler);

test('it test userRoutes', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };
  controller.userRoutes(app);
});

test('it test userPage render', async () => {
  const mockRender = jest.fn();
  await controller.userPage(
    { sessions: { error: [] } },
    { render: mockRender },
  );
  expect(mockRender).toHaveBeenCalledTimes(1);
  expect(mockRender).toHaveBeenCalledWith(`users/views/allUsers.html`, {
    usersData: [],
  });
});

test('it test registerUserForm render', async () => {
  const mockRender = jest.fn();
  await controller.registerUserForm(
    { sessions: { error: [] } },
    { render: mockRender },
  );
  expect(mockRender).toHaveBeenCalledTimes(1);
  expect(mockRender).toHaveBeenCalledWith(`users/views/register.html`);
});

test('it test registerUser controller', async () => {
  const mockRedirect = jest.fn();
  const userData = {
    id: 1,
    name: 'John',
    surname: 'Doe',
    age: '30',
    phone: 5551234,
    email: 'john.doe@example.com',
    document: 12345678,
  };
  await controller.registerUser(
    { sessions: { error: [] }, body: userData },
    { redirect: mockRedirect },
  );
  expect(mockService.createUser).toHaveBeenCalledWith(userData);
  expect(mockService.createUser).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledWith(`/users`);
});

test('it test editUserForm render', async () => {
  const mockRender = jest.fn();
  const req = { params: { id: 1 } };
  await controller.editUserForm(req, { render: mockRender });
  expect(mockService.getUserById).toHaveBeenCalledTimes(1);
  expect(mockService.getUserById).toHaveBeenCalledWith(1);
  expect(mockRender).toHaveBeenCalledWith('users/views/edit.html', {
    userData: {},
  });
});

test('it test editUser controller', async () => {
  const mockRedirect = jest.fn();
  const userData2 = {
    id: 1,
    name: 'Juan',
    surname: 'Perez',
    age: '31',
    phone: 5551234,
    email: 'john.doe@example.com',
    document: 12345678,
  };
  await controller.editUser(
    { params: { id: 1 }, sessions: { error: [] }, body: userData2 },
    { redirect: mockRedirect },
  );
  expect(mockService.editUser).toHaveBeenCalledWith(userData2);
  expect(mockService.editUser).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledWith('/users');
});

test('it test deleteUser controller', async () => {
  const mockRedirect = jest.fn();
  await controller.deleteUser(
    { params: { id: 1 } },
    { redirect: mockRedirect },
  );
  expect(mockService.deleteUser).toHaveBeenCalledWith(1);
  expect(mockService.deleteUser).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledWith('/users');
});
