const Car = require('../entity/Car.js');

class CarsService {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async getAllCars() {
    try {
      return await this.carsRepository.getAllCars();
    } catch (error) {
      this.handleError(error, 'Unable to retrieve cars.');
    }
  }

  async postCar(carData) {
    try {
      const car = new Car(
        null,
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
      );
      await this.carsRepository.postCar(car);
    } catch (error) {
      this.handleError(error, 'Unable to add new car.');
    }
  }

  async editCar(carData) {
    try {
      const car = new Car(
        carData.id,
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
      );
      await this.carsRepository.editCar(car);
    } catch (error) {
      this.handleError(error, 'Unable to update car details.');
    }
  }

  async deleteCar(id) {
    try {
      await this.carsRepository.deleteCar(id);
    } catch (error) {
      this.handleError(error, 'Unable to delete car.');
    }
  }

  async getCarById(id) {
    try {
      const carData = await this.carsRepository.getCarById(id);
      return new Car(
        carData.id,
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
      );
    } catch (error) {
      this.handleError(error, 'Unable to retrieve car details.');
    }
  }

  handleError(error, message) {
    console.error(message, error);
    throw new Error(message);
  }
}

module.exports = CarsService;
