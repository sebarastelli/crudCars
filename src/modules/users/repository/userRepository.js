const User = require('../../../db/models/UserModel.js');

class UserRepository {
  /**
   * Creates a new instance of the UserRepository class.
   */
  constructor() {
    this.model = User;
  }

  async getAllUsers() {
    try {
      const users = await this.model.findAll();
      return users;
    } catch (error) {
      console.error('Unable to retrieve users. Error:', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const user = await this.model.create(userData);
      return user;
    } catch (error) {
      console.error('Unable to create user. Error:', error);
      throw error;
    }
  }

  async editUser(userData) {
    try {
      const user = await this.model.findByPk(userData.id);
      if (user) {
        await user.update(userData);
        return user;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Unable to update user. Error:', error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.model.findByPk(id);
      if (user) {
        await user.destroy();
        return user;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Unable to delete user. Error:', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.model.findByPk(id);
      if (user) {
        return user;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Unable to retrieve user. Error:', error);
      throw error;
    }
  }
}

module.exports = UserRepository;
