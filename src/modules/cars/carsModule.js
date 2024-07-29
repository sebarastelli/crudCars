const carsController = require("./controllers/carsController.js");
const carsRepository = require("./repository/carsRepository.js");
const carsService = require("./service/carsService");

function initCars(app, container) {
  const controller = container.get("carsController");
  controller.carsRoutes(app);
}
module.exports = {
  initCars,
  carsController,
  carsService,
  carsRepository,
};
