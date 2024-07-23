const carsController = require('../carsController.js');
const carsService = require('../../service/carsService.js');
const carsRepository = require('../../repository/carsRepository.js');

const uploadDataHandler = {
    single: jest.fn(),
  };

const mockRepository= {
    carsRepository:jest.fn()
}
const mockService={
    getAllCars:jest.fn(()=>Promise.resolve([])),
    postCar:jest.fn(),
    editCar:jest.fn(),
    deleteCar:jest.fn(()=>Promise.resolve(true)),
    getCarById:jest.fn(()=>Promise.resolve({}))
}

const controller=new carsController(mockService,uploadDataHandler);

test('it test carsRoutes', ()=>{
    const app = {
        get: jest.fn(),
        post: jest.fn(),
      };
      controller.carsRoutes(app);
}); 

test('it test carsPage render',async ()=>{
    const mockRender=jest.fn();
    await controller.carsPage({session:{errors:[]}},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith(`cars/views/viewCars.html`, {
        carsData:[],
    })
});

test('it test postCarForm render', async ()=>{
    const mockRender=jest.fn();
    await controller.postCarForm({},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith('cars/views/postCar.html')
});

test('it test postCar controller', async ()=>{
    const mockRedirect=jest.fn();
    const carData={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    await controller.postCar({session:{errors:[]},body:carData},{redirect:mockRedirect});
    expect(mockService.postCar).toHaveBeenCalledWith(carData);
    expect(mockService.postCar).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/cars')
});

test('it test editCarForm render', async()=>{
    const mockRender=jest.fn();
    const req={params:{'id':1}}
    await controller.editCarForm(req,{render:mockRender});
    expect(mockService.getCarById).toHaveBeenCalledTimes(1)
    expect(mockService.getCarById).toHaveBeenCalledWith(1);
    expect(mockRender).toHaveBeenCalledWith('cars/views/editCar.html', {
        carData:{},
})
})

test('it test editCar controller', async()=>{
    const mockRedirect = jest.fn();
    const carData2 = {
        id: 1, brand: "toyota", model: "corolla", year: 2022, kms: 15000, color: "red",
        ac: "yes", passengers: 6, transmission: "manual", picture: "", price: 150
    };
    
    await controller.editCar({ params: { id: 1 }, session: { errors: [] }, body: carData2 }, { redirect: mockRedirect });
    
    expect(mockService.editCar).toHaveBeenCalledWith(carData2);
    expect(mockService.editCar).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith('/cars');
});

test('it test deleteCar controller', async()=>{
    const mockRedirect=jest.fn();
    await controller.deleteCar({params:{'id':1}},{redirect:mockRedirect});
    expect(mockService.deleteCar).toHaveBeenCalledWith(1);
    expect(mockService.deleteCar).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith('/cars');
})
