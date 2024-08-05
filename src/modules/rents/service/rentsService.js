class RentsService {
  constructor(rentsRepository, carsService, userService) {
    this.rentsRepository = rentsRepository;
    this.carsService = carsService;
    this.userService = userService;
  }

  async getAllRents() {
    return this.rentsRepository.getAllRents();
  }

  async getRentFormDetails() {
    const users = await this.userService.getAllUsers();
    const cars = await this.carsService.getAllCars();
    return { users, cars };
  }

  async rentCar(rentData) {
    const { car, user, startDate, finishDate } = rentData;
    const totalDays = Math.ceil(
      (new Date(finishDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    );
    const rentDataFormatted = {
      id: Date.now(),
      fk_car: car,
      fk_user: user,
      startDate: new Date(startDate).toISOString(),
      finishDate: new Date(finishDate).toISOString(),
      totalDays,
    };
    return this.rentsRepository.rentCar(rentDataFormatted);
  }

  async getEditRentFormDetails(rentId) {
    const rentData = await this.rentsRepository.getRentById(rentId);
    rentData.startDate = new Date(rentData.startDate)
      .toISOString()
      .split('T')[0];
    rentData.finishDate = new Date(rentData.finishDate)
      .toISOString()
      .split('T')[0];
    const users = await this.userService.getAllUsers();
    const cars = await this.carsService.getAllCars();
    return { rentData, users, cars };
  }

  async editRent(rentId, rentData) {
    const { car, user, startDate, finishDate } = rentData;
    const totalDays = Math.ceil(
      (new Date(finishDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    );
    const formData = {
      fk_car: car,
      fk_user: user,
      startDate,
      finishDate,
      totalDays,
    };
    return this.rentsRepository.editRent(rentId, formData);
  }

  async deleteRent(id) {
    return this.rentsRepository.deleteRent(id);
  }

  async getRentById(id) {
    return this.rentsRepository.getRentById(id);
  }
}

module.exports = RentsService;
