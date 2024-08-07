class CarsController {
  /**
   * Creates an instance of the class with the provided carsService.
   *
   * @param {Object} carsService - The service object for cars.
   */
  constructor(carsService) {
    this.carsService = carsService;
  }

  /**
   * Defines the routes for the cars module.
   *
   * @param {Object} app - The Express application object.
   * @return {void} This function does not return anything.
   */
  carsRoutes(app) {
    const root = '/cars';
    app.get(`${root}`, this.carsPage.bind(this));
    app.get(`${root}/postCar`, this.postCarForm.bind(this));
    app.post(`${root}/postCar`, this.postCar.bind(this));
    app.get(`${root}/editCar/:id`, this.editCarForm.bind(this));
    app.post(`${root}/editCar/:id`, this.editCar.bind(this));
    app.get(`${root}/deleteCar/:id`, this.deleteCar.bind(this));
  }

  async carsPage(req, res) {
    try {
      const carsData = await this.carsService.getAllCars();
      res.render('cars/views/viewCars.html', { carsData });
    } catch (error) {
      res.render('cars/views/viewCars.html', {
        error: 'Error retrieving cars.',
      });
    }
  }

  postCarForm(req, res) {
    res.render('cars/views/postCar.html');
  }

  async postCar(req, res) {
    try {
      const formData = req.body;
      await this.carsService.postCar(formData);
      res.redirect('/cars');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/cars/postCar');
    }
  }

  async editCarForm(req, res) {
    try {
      const carData = await this.carsService.getCarById(req.params.id);
      res.render('cars/views/editCar.html', { carData });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/cars');
    }
  }

  async editCar(req, res) {
    try {
      const carData = {
        id: req.params.id,
        ...req.body,
      };
      await this.carsService.editCar(carData);
      res.redirect('/cars');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect(`/cars/editCar/${req.params.id}`);
    }
  }

  async deleteCar(req, res) {
    try {
      await this.carsService.deleteCar(req.params.id);
      res.redirect('/cars');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/cars');
    }
  }
}

module.exports = CarsController;
