const carsController = require('./controllers/carsController.js');
const carsRepository = require('./repository/carsRepository.js');
const carsService = require('./service/carsService');

/**
 * Initializes the car routes by getting the 'carsController' from the container
 * and calling its 'carsRoutes' method with the given 'app' parameter.
 *
 * @param {Object} app - The express application object.
 * @param {Object} container - The dependency injection container object.
 * @return {void} This function does not return anything.
 */
function initCars(app, container) {
  const controller = container.get('carsController');
  controller.carsRoutes(app);
}
module.exports = {
  initCars,
  carsController,
  carsService,
  carsRepository,
};
