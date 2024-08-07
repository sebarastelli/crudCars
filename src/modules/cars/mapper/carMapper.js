const Car = require('../entity/Car');

/**
 * Maps an array of rows to an array of Car objects.
 *
 * @param {Array} rows - An array of objects representing car data.
 * @return {Array} An array of Car objects.
 * @throws {Error} Throws an error if there is an issue mapping the rows.
 */
function carMapper(rows) {
  try {
    return rows.map(
      (row) =>
        new Car(
          row.id,
          row.brand,
          row.model,
          row.year,
          row.kms,
          row.color,
          row.ac,
          row.passengers,
          row.transmission,
          row.picture,
          row.price,
        ),
    );
  } catch (error) {
    console.error('Error in carMapper:', error);
    throw error;
  }
}

module.exports = carMapper;
