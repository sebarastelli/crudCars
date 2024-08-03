class UserRepository {
  constructor(database) {
    (this.tableName = 'users'), (this.database = database);
  }

  getAllUsers() {
    const usersData = `SELECT 
            id,
            name,
            surname,
            age,
            phone,
            email,
            document
            FROM ${this.tableName}
        `;

    return this.database.prepare(usersData).all();
  }

  createUser(userData) {
    const data = `INSERT INTO ${this.tableName} (
                name,
                surname,
                age,
                phone,
                email,
                document
                )VALUES(
                '${userData.name}',
                '${userData.surname}',
                ${userData.age},
                ${userData.phone},
                '${userData.email}',
                '${userData.document}'
                )
        `;

    return this.database.prepare(data).run();
  }

  editUser(userData) {
    const updateUser = `
            UPDATE ${this.tableName} SET
                name = ?,
                surname = ?,
                age = ?,
                phone = ?,
                email = ?,
                document = ?
            WHERE id = ?
        `;
    this.database
      .prepare(updateUser)
      .run(
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
    const userToDelete = `DELETE FROM ${this.tableName} WHERE id=${id}`;
    this.database.prepare(userToDelete).run();
  }

  getUserById(id) {
    console.log(id);
    const userData = `SELECT
            id,
            name,
            surname,
            age,
            phone,
            email,
            document
            FROM ${this.tableName} WHERE id=?
        `;

    const user = this.database.prepare(userData).get(id);
    return user;
  }
}

module.exports = UserRepository;
