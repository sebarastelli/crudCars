class carsService{
    constructor(carsRepository){
        this.carsRepository = carsRepository;
    }
    async getAllCars() {
        return this.carsRepository.getAllCars()
    }
    async postCar(carData) {
        return this.carsRepository.postCar(carData)
    }
    async editCar(carData) {
        return await this.carsRepository.editCar(carData)
    }
    async deleteCar(id) {
        return await this.carsRepository.deleteCar(id)
    }
    async getCarById(id) {
        return await this.carsRepository.getCarById(id);
    }
}

module.exports = carsService;