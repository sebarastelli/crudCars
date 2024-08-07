class RentsService {
  /**
   * Initializes a new instance of the RentsService class.
   *
   * @param {Object} rentsRepository - The repository for managing rents.
   * @param {Object} carsService - The service for managing cars.
   * @param {Object} userService - The service for managing users.
   */
  constructor(rentsRepository, carsService, userService) {
    this.rentsRepository = rentsRepository;
    this.carsService = carsService;
    this.userService = userService;
  }

  async getAllRents() {
    try {
      return await this.rentsRepository.getAllRents();
    } catch (error) {
      this.handleError(error, 'Error al obtener todas las rentas');
    }
  }

  async getRentFormDetails() {
    try {
      const users = await this.userService.getAllUsers();
      const cars = await this.carsService.getAllCars();
      return { users, cars };
    } catch (error) {
      this.handleError(
        error,
        'Error al obtener detalles del formulario de renta',
      );
    }
  }

  async rentCar(rentData) {
    try {
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
      return await this.rentsRepository.rentCar(rentDataFormatted);
    } catch (error) {
      this.handleError(error, 'Error al registrar la renta');
    }
  }

  async getEditRentFormDetails(rentId) {
    try {
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
    } catch (error) {
      this.handleError(
        error,
        'Error al obtener detalles del formulario de edición de renta',
      );
    }
  }

  async editRent(rentId, rentData) {
    try {
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
      return await this.rentsRepository.editRent(rentId, formData);
    } catch (error) {
      this.handleError(error, 'Error al editar la renta');
    }
  }

  async deleteRent(id) {
    try {
      return await this.rentsRepository.deleteRent(id);
    } catch (error) {
      this.handleError(error, 'Error al eliminar la renta');
    }
  }

  async getRentById(id) {
    try {
      return await this.rentsRepository.getRentById(id);
    } catch (error) {
      this.handleError(error, 'Error al obtener la renta por ID');
    }
  }

  handleError(error, message) {
    console.error(message, error);
    throw new Error(message);
  }
}

module.exports = RentsService;
