class RentsRepository {
  constructor(database) {
    this.tableName = "rents";
    this.database = database;
  }

  getAllRents() {
    const data = `
        SELECT
            rents.id,
            cars.brand,
            cars.model,
            cars.year,
            cars.kms,
            cars.color,
            cars.ac,
            cars.passengers,
            cars.transmission,
            cars.picture,
            cars.price,
            users.name,
            users.surname,
            users.document,
            rents.startDate,
            rents.finishDate,
            rents.totalDays
        FROM rents
        INNER JOIN cars ON rents.fk_car = cars.id
        INNER JOIN users ON rents.fk_user = users.id
    `;
    return this.database.prepare(data).all();
  }

  rentCar(rentData) {
    const data = `
        INSERT INTO ${this.tableName} (
            id,
            fk_car,
            fk_user,
            startDate,
            finishDate,
            totalDays
        ) VALUES (
            @id,
            @fk_car,
            @fk_user,
            @startDate,
            @finishDate,
            @totalDays
        )
    `;
    const stmt = this.database.prepare(data);
    return stmt.run(rentData);
  }

  editRent(id, formData) {
    const data = `UPDATE ${this.tableName} SET
    fk_car = ${formData.fk_car},
    fk_user = ${formData.fk_user},
    startDate = '${formData.startDate}',
    finishDate = '${formData.finishDate}',
    totalDays = ${formData.totalDays}
    WHERE id = ${id}`;
    return this.database.prepare(data).run();
  }

  deleteRent(id) {
    const data = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
    return this.database.prepare(data).run();
  }

  getRentById(id) {
    const data = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
    return this.database.prepare(data).get();
  }
}

module.exports = RentsRepository;
