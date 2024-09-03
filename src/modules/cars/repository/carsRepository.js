const Car = require('../../../db/models/CarModel.js');

class CarsRepository {
  /**
   * Creates a new instance of the CarsRepository class.
   */
  constructor() {
    this.model = Car;
  }

  async getAllCars() {
    const cars = await this.model.findAll();
    return cars.map((car) => car.toJSON()); // Converts Sequelize instances to plain objects
  }

  async postCar(carData) {
    const car = await this.model.create(carData);
    return car.toJSON();
  }

  async editCar(carData) {
    const [updated] = await this.model.update(carData, {
      where: { id: carData.id },
    });
    return updated; // Returns number of affected rows (should be 1 if successful)
  }

  async deleteCar(id) {
    const deleted = await this.model.destroy({
      where: { id },
    });
    return deleted; // Returns number of affected rows (should be 1 if successful)
  }

  async getCarById(id) {
    const car = await this.model.findByPk(id);
    return car ? car.toJSON() : undefined;
  }
}

module.exports = CarsRepository;
