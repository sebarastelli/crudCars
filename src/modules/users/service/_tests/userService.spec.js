const UserService = require('../userService.js');
const User = require('../../entity/User.js');

const mockRepository = {
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  editUser: jest.fn(),
  deleteUser: jest.fn(),
};

const service = new UserService(mockRepository);

test('it tests getAllUsers service', async () => {
  const users = [
    new User(1, 'John', 'Doe', 30, '1234567890', 'john@example.com', '1234'),
  ];
  mockRepository.getAllUsers.mockResolvedValue(users);

  const result = await service.getAllUsers();
  expect(mockRepository.getAllUsers).toHaveBeenCalled();
  expect(result).toEqual(users);
});

test('it tests getUserById service', async () => {
  const user = new User(
    1,
    'John',
    'Doe',
    30,
    '1234567890',
    'john@example.com',
    '1234',
  );
  mockRepository.getUserById.mockResolvedValue(user);

  const result = await service.getUserById(1);
  expect(mockRepository.getUserById).toHaveBeenCalledWith(1);
  expect(result).toEqual(user);
});

test('it tests createUser service', async () => {
  const userData = {
    name: 'John',
    surname: 'Doe',
    age: 30,
    phone: '1234567890',
    email: 'john@example.com',
    document: '1234',
  };

  await service.createUser(userData);
  expect(mockRepository.createUser).toHaveBeenCalledWith(expect.any(User));
});

test('it tests editUser service', async () => {
  const userData = {
    id: 1,
    name: 'John',
    surname: 'Doe',
    age: 30,
    phone: '1234567890',
    email: 'john@example.com',
    document: '1234',
  };

  await service.editUser(userData);
  expect(mockRepository.editUser).toHaveBeenCalledWith(expect.any(User));
});

test('it tests deleteUser service', async () => {
  await service.deleteUser(1);
  expect(mockRepository.deleteUser).toHaveBeenCalledWith(1);
});
