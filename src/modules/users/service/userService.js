const User = require('../entity/User.js');

class UserService {
  /**
   * Creates a new instance of the UserService class.
   *
   * @param {Object} userRepository - The repository object for user data.
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      this.handleError(error, 'Unable to retrieve users.');
    }
  }

  async createUser(data) {
    try {
      const user = new User(
        null,
        data.name,
        data.surname,
        data.age,
        data.phone,
        data.email,
        data.document,
      );
      await this.userRepository.createUser(user);
    } catch (error) {
      this.handleError(error, 'Unable to add new user.');
    }
  }

  async editUser(userData) {
    try {
      const user = new User(
        userData.id,
        userData.name,
        userData.surname,
        userData.age,
        userData.phone,
        userData.email,
        userData.document,
      );
      await this.userRepository.editUser(user);
    } catch (error) {
      this.handleError(error, 'Unable to update user.');
    }
  }

  async deleteUser(id) {
    try {
      await this.userRepository.deleteUser(id);
    } catch (error) {
      this.handleError(error, 'Unable to delete user.');
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.getUserById(id);
      return new User(
        user.id,
        user.name,
        user.surname,
        user.age,
        user.phone,
        user.email,
        user.document,
      );
    } catch (error) {
      this.handleError(error, 'Unable to retrieve user.');
    }
  }

  handleError(error, message) {
    console.error(message, error);
    throw new Error(message);
  }
}

module.exports = UserService;
