const Rent = require('../../../db/models/RentModel.js');
const Car = require('../../../db/models/CarModel.js');
const User = require('../../../db/models/UserModel.js');

class RentsRepository {
  constructor() {
    this.model = Rent;
  }

  async getAllRents() {
    try {
      const rents = await this.model.findAll({
        include: [
          {
            model: Car,
            attributes: [
              'id',
              'brand',
              'model',
              'year',
              'kms',
              'color',
              'ac',
              'passengers',
              'transmission',
              'picture',
              'price',
            ],
          },
          {
            model: User,
            attributes: [
              'id',
              'name',
              'surname',
              'age',
              'phone',
              'email',
              'document',
            ],
          },
        ],
      });
      return rents;
    } catch (error) {
      console.error('Unable to retrieve rents. Error:', error);
      throw error;
    }
  }

  async rentCar(rentData) {
    try {
      const rent = await this.model.create(rentData);
      return rent;
    } catch (error) {
      console.error('Unable to create rent. Error:', error);
      throw error;
    }
  }

  async editRent(id, formData) {
    try {
      const rent = await this.model.findByPk(id);
      if (rent) {
        await rent.update(formData);
        return rent;
      } else {
        throw new Error('Rent not found');
      }
    } catch (error) {
      console.error('Unable to update rent. Error:', error);
      throw error;
    }
  }

  async deleteRent(id) {
    try {
      const rent = await this.model.findByPk(id);
      if (rent) {
        await rent.destroy();
        return rent;
      } else {
        throw new Error('Rent not found');
      }
    } catch (error) {
      console.error('Unable to delete rent. Error:', error);
      throw error;
    }
  }

  async getRentById(id) {
    try {
      const rent = await this.model.findByPk(id, {
        include: [
          {
            model: Car,
            attributes: [
              'id',
              'brand',
              'model',
              'year',
              'kms',
              'color',
              'ac',
              'passengers',
              'transmission',
              'picture',
              'price',
            ],
          },
          {
            model: User,
            attributes: [
              'id',
              'name',
              'surname',
              'age',
              'phone',
              'email',
              'document',
            ],
          },
        ],
      });
      return rent || undefined;
    } catch (error) {
      console.error('Unable to retrieve rent. Error:', error);
      throw error;
    }
  }
}

module.exports = RentsRepository;
