const RentsController = require('./controllers/rentsController');
const RentsService = require('./service/rentsService');
const RentsRepository = require('./repository/rentsRepository');

/**
 * Initializes the rent routes by getting the rentsController from the container
 * and calling its rentsRoutes method with the given app parameter.
 *
 * @param {Object} app - The express application object.
 * @param {Object} container - The dependency injection container object.
 * @return {void} This function does not return anything.
 */
function initRent(app, container) {
  const controller = container.get('rentsController');
  controller.rentsRoutes(app);
}

module.exports = {
  RentsController,
  RentsService,
  RentsRepository,
  initRent,
};
