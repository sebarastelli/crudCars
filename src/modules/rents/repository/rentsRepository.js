class RentsRepository {
  constructor(database) {
    this.tableName = "rents";
    this.database = database;
  }

  getAllRents() {
    const rentsData = `SELECT 
        id,
        fk_car,
        fk_user,
        startDate,
        finishDate,
        totalDays
        FROM ${this.tableName}`
        return this.database.prepare(rentsData).all()
  }

  rentCar(rentData){
    const data = `INSERT INTO ${this.tableName} (
        id,
        fk_car,
        fk_user,
        startDate,
        finishDate,
        totalDays)
        VALUES(
        ${rentData.id},
        ${rentData.fk_car},
        ${rentData.fk_user},
        ${rentData.startDate},
        ${rentData.finishDate},
        ${rentData.totalDays}
        )`
        return this.database.prepare(data).run()
  }

  editRent(rentData){
    const data = `UPDATE ${this.tableName} SET
    fk_car = ${rentData.fk_car},
    fk_user = ${rentData.fk_user},
    startDate = ${rentData.startDate},
    finishDate = ${rentData.finishDate},
    totalDays = ${rentData.totalDays}
    WHERE id = ${rentData.id}`
    return this.database.prepare(data).run()
  }

  deleteRent(id){
    const data = `DELETE FROM ${this.tableName} WHERE id = ${id}`
    return this.database.prepare(data).run()
  }

  getRentById(id){
    const data = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
    return this.database.prepare(data).get()
  }
}

module.exports = RentsRepository;
