const {
  RentsController,
  RentsService,
  RentsRepository,
  initRent,
} = require("../rentsModule");

const mockApp = {
  use: jest.fn(),
};
const mockContainer = {
  get: jest.fn(),
};

describe("initRent", () => {
  beforeEach(() => {
    mockApp.use.mockClear();
    mockContainer.get.mockClear();
  });

  it("should initialize rent routes", () => {
    const mockRentsController = {
      rentsRoutes: jest.fn(),
    };
    mockContainer.get.mockReturnValue(mockRentsController);
    initRent(mockApp, mockContainer);
    expect(mockContainer.get).toHaveBeenCalledWith("rentsController");
    expect(mockRentsController.rentsRoutes).toHaveBeenCalledWith(mockApp);
  });
});

describe("module exports", () => {
  it("should export rentsController, rentsService, and rentsRepository", () => {
    expect(RentsController).toBeDefined();
    expect(RentsService).toBeDefined();
    expect(RentsRepository).toBeDefined();
  });
});
