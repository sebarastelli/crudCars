require('dotenv').config({ path: '../../.env' });
const sequelize = require('../db/sequelizeConfig.js');
const session = require('express-session');
const { default: DIContainer, object, use, factory } = require('rsdi');
const {
  userController,
  userService,
  userRepository,
} = require('../modules/users/userModule.js');
const {
  carsController,
  carsService,
  carsRepository,
} = require('../modules/cars/carsModule.js');
const {
  RentsController,
  RentsService,
  RentsRepository,
} = require('../modules/rents/rentsModule');
const User = require('../db/models/UserModel.js');
const Car = require('../db/models/CarModel.js');
const Rent = require('../db/models/RentModel.js');

/**
 * Configures the session options for the application.
 *
 * @return {function} A session middleware function.
 */
function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;
  const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

/**
 * Syncs the database models and returns the Sequelize instance.
 *
 * @return {Promise<Sequelize>} The Sequelize instance.
 */
async function runDatabase() {
  await sequelize.sync({ force: process.env.NODE_ENV === 'test' });
  return sequelize;
}

/**
 * Adds common definitions to the DI container.
 *
 * @param {DIContainer} container - The DI container.
 */
function addCommonDefinitions(container) {
  container.add({
    runDatabase: factory(runDatabase),
    session: factory(configureSession),
  });
}

/**
 * Adds user-related definitions to the DI container.
 *
 * @param {DIContainer} container - The DI container.
 */
function addUsersDefinitions(container) {
  container.add({
    userController: object(userController).construct(use('userService')),
    userService: object(userService).construct(use('userRepository')),
    userRepository: object(userRepository).construct(use(User)),
    User: object(User),
  });
}

/**
 * Adds car-related definitions to the DI container.
 *
 * @param {DIContainer} container - The DI container.
 */
function addCarsDefinitions(container) {
  container.add({
    carsController: object(carsController).construct(use('carsService')),
    carsService: object(carsService).construct(use('carsRepository')),
    carsRepository: object(carsRepository).construct(use(Car)),
    Car: object(Car),
  });
}

/**
 * Adds rent-related definitions to the DI container.
 *
 * @param {DIContainer} container - The DI container.
 */
function addRentsDefinitions(container) {
  container.add({
    rentsController: object(RentsController).construct(
      use('rentsService'),
      use('carsService'),
      use('userService'),
    ),
    rentsService: object(RentsService).construct(
      use('rentsRepository'),
      use('carsService'),
      use('userService'),
    ),
    rentsRepository: object(RentsRepository).construct(use(Rent)),
    Rent: object(Rent),
  });
}

User.hasMany(Rent, { foreignKey: 'fk_user' });
Rent.belongsTo(User, { foreignKey: 'fk_user' });

Car.hasOne(Rent, { foreignKey: 'fk_car' });
Rent.belongsTo(Car, { foreignKey: 'fk_car' });

/**
 * Configures the dependency injection container and returns it.
 *
 * @return {DIContainer} The configured dependency injection container.
 */
module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addUsersDefinitions(container);
  addCarsDefinitions(container);
  addRentsDefinitions(container);
  return container;
};
