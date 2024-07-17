class userService {
    constructor(userRepository) {
        this.userRepository=userRepository
    }

    async getAllUsers() {
        return this.userRepository.getAllUsers()
    }
    async createUser(data) {
        return this.userRepository.addUser(data)
    }

    async editUser(userData) {
        return await this.userRepository.editUser(userData)
    }

    async deleteUser(id) {
        return await this.userRepository.deleteUser(id)
    }

    async getUserById(id) {
        return await this.userRepository.getUserById(id);
    }

} 

module.exports = userService