const userController = require('./controller/userController.js');
const userRepository = require('./repository/userRepository.js');
const userService = require('./service/userService');

/**
 * Initializes the user routes by getting the user controller from the container
 * and calling its userRoutes method with the given app parameter.
 *
 * @param {Object} app - The express application object.
 * @param {Object} container - The dependency injection container object.
 * @return {void} This function does not return anything.
 */
function initUsers(app, container) {
  const controller = container.get('userController');
  controller.userRoutes(app);
}

module.exports = {
  initUsers,
  userController,
  userService,
  userRepository,
};
