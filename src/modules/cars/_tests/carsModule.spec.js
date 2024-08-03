const {
  initCars,
  carsController,
  carsService,
  carsRepository,
} = require('../carsModule.js');

const mockApp = {
  use: jest.fn(),
};
const mockContainer = {
  get: jest.fn(),
};

describe('initCars', () => {
  beforeEach(() => {
    mockApp.use.mockClear();
    mockContainer.get.mockClear();
  });

  it('should initialize car routes', () => {
    const mockCarsController = {
      carsRoutes: jest.fn(),
    };
    mockContainer.get.mockReturnValue(mockCarsController);
    initCars(mockApp, mockContainer);
    expect(mockContainer.get).toHaveBeenCalledWith('carsController');
    expect(mockCarsController.carsRoutes).toHaveBeenCalledWith(mockApp);
  });
});

describe('module exports', () => {
  it('should export carsController, carsService, and carsRepository', () => {
    expect(carsController).toBeDefined();
    expect(carsService).toBeDefined();
    expect(carsRepository).toBeDefined();
  });
});
