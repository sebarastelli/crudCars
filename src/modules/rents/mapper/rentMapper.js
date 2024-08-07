const Rent = require('../entity/Rent');

/**
 * Maps an array of row objects to an array of Rent objects.
 *
 * @param {Array} rows - An array of row objects.
 * @return {Array} An array of Rent objects.
 */
function rentMapper(rows) {
  return rows.map(
    (row) =>
      new Rent({
        id: row.rent_id,
        fk_car: row.fk_car,
        fk_user: row.fk_user,
        brand: row.brand,
        model: row.model,
        year: row.year,
        kms: row.kms,
        color: row.color,
        ac: row.ac,
        passengers: row.passengers,
        transmission: row.transmission,
        picture: row.picture,
        price: row.price,
        name: row.name,
        surname: row.surname,
        document: row.document,
        startDate: row.startDate,
        finishDate: row.finishDate,
        totalDays: row.totalDays,
      }),
  );
}

module.exports = rentMapper;
