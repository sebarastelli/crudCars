class rentsService{
    constructor(rentsRepository){
        this.rentsRepository = rentsRepository
    }

    async getAllRents(){
        await this.rentsRepository.getAllRents()
    }

    async rentCar(rentData){
        await this.rentsRepository.rentCar(rentData)
    }

    async editRent(rentData){
        await this.rentsRepository.editRent(rentData)
    }

    async deleteRent(id){
        await this.rentsRepository.deleteRent(id)
    }

    async getRentById(id){
        await this.rentsRepository.getRentById(id)
    }

}

module.exports = rentsService;