class Rent {
  /**
   * Constructs a new Rent object.
   *
   * @param {Object} options - The options for the Rent object.
   * @param {number} options.id - The ID of the Rent.
   * @param {number} options.fk_car - The foreign key of the car associated with the Rent.
   * @param {number} options.fk_user - The foreign key of the user associated with the Rent.
   * @param {string} options.brand - The brand of the car.
   * @param {string} options.model - The model of the car.
   * @param {number} options.year - The year of the car.
   * @param {number} options.kms - The kilometers of the car.
   * @param {string} options.color - The color of the car.
   * @param {boolean} options.ac - Whether the car has air conditioning.
   * @param {number} options.passengers - The maximum number of passengers the car can accommodate.
   * @param {string} options.transmission - The transmission type of the car.
   * @param {string} options.picture - The URL of the car's picture.
   * @param {number} options.price - The price of the Rent.
   * @param {string} options.name - The name of the user.
   * @param {string} options.surname - The surname of the user.
   * @param {number} options.document - The document of the user.
   * @param {string} options.startDate - The start date of the Rent.
   * @param {string} options.finishDate - The finish date of the Rent.
   * @param {number} options.totalDays - The total number of days of the Rent.
   */

  constructor({
    id,
    fk_car,
    fk_user,
    brand,
    model,
    year,
    kms,
    color,
    ac,
    passengers,
    transmission,
    picture,
    price,
    name,
    surname,
    document,
    startDate,
    finishDate,
    totalDays,
  }) {
    this.id = id;
    this.fk_car = fk_car;
    this.fk_user = fk_user;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.ac = ac;
    this.passengers = passengers;
    this.transmission = transmission;
    this.picture = picture;
    this.price = price;
    this.name = name;
    this.surname = surname;
    this.document = document;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.totalDays = totalDays;
  }
}

module.exports = Rent;
