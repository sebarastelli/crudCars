const userController = require("./controller/userController.js");
const userRepository = require("./repository/userRepository.js");
const userService = require("./service/userService");

function initUsers(app, container) {
  const controller = container.get("userController");
  controller.userRoutes(app);
}

module.exports = {
  initUsers,
  userController,
  userService,
  userRepository,
};
