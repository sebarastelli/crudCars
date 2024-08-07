const Rent = require('../entity/Rent.js');
const rentMapper = require('../mapper/rentMapper.js');

class RentsRepository {
  /**
   * Creates a new instance of the RentsRepository class.
   *
   * @param {Object} database - The database object to use for interacting with the database.
   */
  constructor(database) {
    this.tableName = 'rents';
    this.database = database;
  }

  getAllRents() {
    const query = `
    SELECT rents.id AS rent_id, cars.*, users.*, rents.startDate, rents.finishDate, rents.totalDays
    FROM rents
    INNER JOIN cars ON rents.fk_car = cars.id
    INNER JOIN users ON rents.fk_user = users.id
  `;
    const rows = this.database.prepare(query).all();
    return rentMapper(rows);
  }

  rentCar(rentData) {
    const query = `
    INSERT INTO ${this.tableName} (id, fk_car, fk_user, startDate, finishDate, totalDays)
    VALUES (@id, @fk_car, @fk_user, @startDate, @finishDate, @totalDays)
  `;
    return this.database.prepare(query).run(rentData);
  }

  editRent(id, formData) {
    const query = `
      UPDATE ${this.tableName} SET
      fk_car = @fk_car,
      fk_user = @fk_user,
      startDate = @startDate,
      finishDate = @finishDate,
      totalDays = @totalDays
      WHERE id = @id
    `;
    return this.database.prepare(query).run({ id, ...formData });
  }

  deleteRent(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    return this.database.prepare(query).run(id);
  }

  getRentById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const row = this.database.prepare(query).get(id);
    return row ? new Rent(row) : undefined;
  }
}

module.exports = RentsRepository;
