const Car = require('../entity/Car.js');
const carMapper = require('../mapper/carMapper.js');

class CarsRepository {
  /**
   * Creates a new instance of the CarsRepository class.
   *
   * @param {Object} database - The database object to use for interacting with the database.
   */
  constructor(database) {
    this.tableName = 'cars';
    this.database = database;
  }

  getAllCars() {
    const carsData = `
      SELECT 
        id, brand, model, year, kms, color, ac, passengers, transmission, picture, price
      FROM ${this.tableName}
    `;
    const rows = this.database.prepare(carsData).all();
    return carMapper(rows);
  }

  postCar(car) {
    const insertCar = `
      INSERT INTO ${this.tableName} (
        brand, model, year, kms, color, ac, passengers, transmission, picture, price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const stmt = this.database.prepare(insertCar);
    return stmt.run(
      car.brand,
      car.model,
      car.year,
      car.kms,
      car.color,
      car.ac,
      car.passengers,
      car.transmission,
      car.picture,
      car.price,
    );
  }

  editCar(car) {
    const updateCar = `
      UPDATE ${this.tableName} SET
        brand = ?, model = ?, year = ?, kms = ?, color = ?, ac = ?, passengers = ?, transmission = ?, picture = ?, price = ?
      WHERE id = ?
    `;
    const stmt = this.database.prepare(updateCar);
    stmt.run(
      car.brand,
      car.model,
      car.year,
      car.kms,
      car.color,
      car.ac,
      car.passengers,
      car.transmission,
      car.picture,
      car.price,
      car.id,
    );
  }

  deleteCar(id) {
    const deleteCar = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const stmt = this.database.prepare(deleteCar);
    stmt.run(id);
  }

  getCarById(id) {
    const carData = `
      SELECT
        id, brand, model, year, kms, color, ac, passengers, transmission, picture, price
      FROM ${this.tableName} WHERE id = ?
    `;
    const row = this.database.prepare(carData).get(id);
    if (row) {
      return new Car(
        row.id,
        row.brand,
        row.model,
        row.year,
        row.kms,
        row.color,
        row.ac,
        row.passengers,
        row.transmission,
        row.picture,
        row.price,
      );
    }
    return undefined;
  }
}

module.exports = CarsRepository;
