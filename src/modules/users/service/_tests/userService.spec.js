const userService = require('../userService.js');

const mockRepository = {
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  editUser: jest.fn(),
  deleteUser: jest.fn(),
};

const service = new userService(mockRepository);

test('it test getAllUsers service', () => {
  service.getAllUsers();
  expect(mockRepository.getAllUsers).toHaveBeenCalled();
});

test('it test getUserById service', () => {
  service.getUserById(1);
  expect(mockRepository.getUserById).toHaveBeenCalled();
});

test('it test createUser service', () => {
  service.createUser({});
  expect(mockRepository.createUser).toHaveBeenCalled();
});

test('it test editUser service', () => {
  service.editUser({});
  expect(mockRepository.editUser).toHaveBeenCalled();
});

test('it test deleteUser service', () => {
  service.deleteUser(1);
  expect(mockRepository.deleteUser).toHaveBeenCalled();
});
