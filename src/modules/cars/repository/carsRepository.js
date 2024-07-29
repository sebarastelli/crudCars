class CarsRepository {
  constructor(database) {
    (this.tableName = "cars"), (this.database = database);
  }

  getAllCars() {
    const carsData = `SELECT 
            id,
            brand,
            model,
            year,
            kms,
            color,
            ac,
            passengers,
            transmission,
            picture,
            price
            FROM ${this.tableName}
        `;
    return this.database.prepare(carsData).all();
  }

  postCar(carData) {
    const data = `INSERT INTO ${this.tableName} (
            brand,
            model,
            year,
            kms,
            color,
            ac,
            passengers,
            transmission,
            picture,
            price
            )VALUES(
            '${carData.brand}',
            '${carData.model}',
            ${carData.year},
            ${carData.kms},
            '${carData.color}',
            '${carData.ac}',
            ${carData.passengers},
            '${carData.transmission}',
            '${carData.picture}',
            '${carData.price}'
            )
    `;
    return this.database.prepare(data).run();
  }

  editCar(carData) {
    const updateCar = `
            UPDATE ${this.tableName} SET
                brand = ?,
                model = ?,
                year = ?,
                kms = ?,
                color = ?,
                ac = ?,
                passengers = ?,
                transmission = ?,
                picture = ?,
                price = ?
            WHERE id = ?
        `;
    this.database
      .prepare(updateCar)
      .run(
        carData.brand,
        carData.model,
        carData.year,
        carData.kms,
        carData.color,
        carData.ac,
        carData.passengers,
        carData.transmission,
        carData.picture,
        carData.price,
        carData.id,
      );
  }

  deleteCar(id) {
    const carToDelete = `DELETE FROM ${this.tableName} WHERE id=${id}`;
    this.database.prepare(carToDelete).run();
  }

  getCarById(id) {
    const carData = `SELECT
            id,
            brand,
            model,
            year,
            kms,
            color,
            ac,
            passengers,
            transmission,
            picture,
            price
            FROM ${this.tableName} WHERE id=?
        `;
    const car = this.database.prepare(carData).get(id);
    return car;
  }
}

module.exports = CarsRepository;
