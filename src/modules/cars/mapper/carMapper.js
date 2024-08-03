const Car = require('../entity/Car');

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
