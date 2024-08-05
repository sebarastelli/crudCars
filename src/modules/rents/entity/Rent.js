class Rent {
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
