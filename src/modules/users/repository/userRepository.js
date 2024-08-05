const User = require('../entity/User.js');
const userMapper = require('../mapper/userMapper.js');

class UserRepository {
  constructor(database) {
    this.tableName = 'users';
    this.database = database;
  }

  getAllUsers() {
    const usersData = `
      SELECT 
        id, name, surname, age, phone, email, document
      FROM ${this.tableName}
    `;
    const rows = this.database.prepare(usersData).all();
    return userMapper(rows);
  }

  createUser(userData) {
    const insertUser = `
      INSERT INTO ${this.tableName} (name, surname, age, phone, email, document)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const stmt = this.database.prepare(insertUser);
    return stmt.run(
      userData.name,
      userData.surname,
      userData.age,
      userData.phone,
      userData.email,
      userData.document,
    );
  }

  editUser(userData) {
    const updateUser = `
      UPDATE ${this.tableName} SET
        name = ?, surname = ?, age = ?, phone = ?, email = ?, document = ?
      WHERE id = ?
    `;
    const stmt = this.database.prepare(updateUser);
    stmt.run(
      userData.name,
      userData.surname,
      userData.age,
      userData.phone,
      userData.email,
      userData.document,
      userData.id,
    );
  }

  deleteUser(id) {
    const deleteUser = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const stmt = this.database.prepare(deleteUser);
    stmt.run(id);
  }

  getUserById(id) {
    const userData = `
      SELECT id, name, surname, age, phone, email, document
      FROM ${this.tableName} WHERE id = ?
    `;
    const row = this.database.prepare(userData).get(id);
    if (row) {
      return new User(
        row.id,
        row.name,
        row.surname,
        row.age,
        row.phone,
        row.email,
        row.document,
      );
    }
    return undefined;
  }
}

module.exports = UserRepository;
