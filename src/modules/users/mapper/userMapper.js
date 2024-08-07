const User = require('../entity/User.js');

/**
 * Maps an array of rows to an array of User objects.
 *
 * @param {Array} rows - An array of objects representing user data.
 * @return {Array} An array of User objects.
 * @throws {Error} Throws an error if there is an issue mapping the rows.
 */
function userMapper(rows) {
  try {
    return rows.map(
      (row) =>
        new User(
          row.id,
          row.name,
          row.surname,
          row.age,
          row.phone,
          row.email,
          row.document,
        ),
    );
  } catch (error) {
    console.error('Error in userMapper:', error);
    throw error;
  }
}

module.exports = userMapper;
