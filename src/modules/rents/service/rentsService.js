class RentsService {
  constructor(rentsRepository) {
    this.rentsRepository = rentsRepository;
  }

  async getAllRents() {
    return this.rentsRepository.getAllRents();
  }

  async rentCar(rentData) {
    return this.rentsRepository.rentCar(rentData);
  }

  async editRent({ id, ...formData }) {
    return this.rentsRepository.editRent(id, formData);
  }

  async deleteRent(id) {
    return this.rentsRepository.deleteRent(id);
  }

  async getRentById(id) {
    return this.rentsRepository.getRentById(id);
  }
}

module.exports = RentsService;
