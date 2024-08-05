const User = require('../entity/User.js');

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
