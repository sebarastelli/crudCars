class carsController {
  constructor(carsService) {
    this.carsService = carsService;
  }

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
      res.render('cars/views/viewCars.html', {
        carsData,
      });
    } catch (error) {
      res.render('cars/views/viewCars.html', {
        error,
      });
    }
  }

  async postCarForm(req, res) {
    res.render('cars/views/postCar.html');
  }

  async postCar(req, res) {
    try {
      const formData = req.body;
      await this.carsService.postCar(formData);
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/cars');
  }

  async editCarForm(req, res) {
    try {
      const carData = await this.carsService.getCarById(req.params.id);
      res.render('cars/views/editCar.html', {
        carData,
      });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/');
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
    }
  }

  async deleteCar(req, res) {
    try {
      await this.carsService.deleteCar(req.params.id);
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/cars');
  }
}

module.exports = carsController;
