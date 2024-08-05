class Car {
  /**
   * Creates a new Car object with the given properties.
   *
   * @param {number} id - The unique identifier of the car.
   * @param {string} brand - The brand of the car.
   * @param {string} model - The model of the car.
   * @param {number} year - The year of manufacture of the car.
   * @param {number} kms - The number of kilometers the car has driven.
   * @param {string} color - The color of the car.
   * @param {boolean} ac - Indicates if the car has air conditioning.
   * @param {number} passengers - The number of passengers the car can hold.
   * @param {string} transmission - The transmission type of the car (e.g. automatic, manual).
   * @param {string} picture - The URL of the car's picture.
   * @param {number} price - The price of the car.
   */
  constructor(
    id,
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
  ) {
    this.id = id;
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
  }
}

module.exports = Car;
