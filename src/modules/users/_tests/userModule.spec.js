const {
    initUsers,
    userController,
    userService,
    userRepository
} = require('../userModule.js');

const mockApp = {
    use: jest.fn(),
  };
  const mockContainer = {
    get: jest.fn(),
  };


describe('initUsers', ()=>{
    beforeEach(()=>{
        mockApp.use.mockClear();
        mockContainer.get.mockClear();
    })
    it("should initialize user routes", () => {
        const mockUserController = {
          userRoutes: jest.fn(),
        };
        mockContainer.get.mockReturnValue(mockUserController);
        initUsers(mockApp, mockContainer);
        expect(mockContainer.get).toHaveBeenCalledWith("userController");
        expect(mockUserController.userRoutes).toHaveBeenCalledWith(mockApp);
      });
});

describe('module exports', ()=>{
    it('should export userController, userService, and userRepository',()=>{
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    })
})