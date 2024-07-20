const RentsController = require('./controllers/rentsController');
const RentsService = require('./service/rentsService');
const RentsRepository = require('./repository/rentsRepository');

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