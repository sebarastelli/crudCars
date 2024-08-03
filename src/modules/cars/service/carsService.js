const Car = require('../entity/Car.js');

class CarsService {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async getAllCars() {
    try {
      const cars = await this.carsRepository.getAllCars();
      return cars;
    } catch (error) {
      console.error('Error getting all cars:', error);
      throw new Error('Unable to retrieve cars.');
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
      console.error('Error posting car:', error);
      throw new Error('Unable to add new car.');
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
      console.error('Error editing car:', error);
      throw new Error('Unable to update car details.');
    }
  }

  async deleteCar(id) {
    try {
      await this.carsRepository.deleteCar(id);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw new Error('Unable to delete car.');
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
      console.error('Error getting car by ID:', error);
      throw new Error('Unable to retrieve car details.');
    }
  }
}

module.exports = CarsService;
