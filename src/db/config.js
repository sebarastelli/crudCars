require('dotenv').config({ path: '../../.env' });
const database = require('better-sqlite3');
const fs = require('fs');
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

function runDatabase() {
  const dbPath =
    process.env.NODE_ENV === 'test' ? ':memory:' : process.env.DB_PATH;
  const dataBase = new database(dbPath, { verbose: console.log });
  if (process.env.NODE_ENV !== 'test') {
    const tables = fs.readFileSync(process.env.DB_TABLES_PATH, 'utf8');
    dataBase.exec(tables);
  }
  return dataBase;
}

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

function addCommonDefinitions(container) {
  container.add({
    runDatabase: factory(runDatabase),
    session: factory(configureSession),
  });
}

function addUsersDefinitions(container) {
  container.add({
    userController: object(userController).construct(use('userService')),
    userService: object(userService).construct(use('userRepository')),
    userRepository: object(userRepository).construct(use('runDatabase')),
  });
}

function addCarsDefinitions(container) {
  container.add({
    carsController: object(carsController).construct(use('carsService')),
    carsService: object(carsService).construct(use('carsRepository')),
    carsRepository: object(carsRepository).construct(use('runDatabase')),
  });
}

function addRentsDefinitions(container) {
  container.add({
    rentsController: object(RentsController).construct(
      use('rentsService'),
      use('carsService'),
      use('userService'),
    ),
    rentsService: object(RentsService).construct(use('rentsRepository')),
    rentsRepository: object(RentsRepository).construct(use('runDatabase')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addUsersDefinitions(container);
  addCarsDefinitions(container);
  addRentsDefinitions(container);
  return container;
};
